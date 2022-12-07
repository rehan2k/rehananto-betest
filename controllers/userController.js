const {
  findByUsername,
  createUser,
  findUser,
  findAll,
  updateUser,
  deleteUser,
} = require("../services/userService");
const { secret } = require("../config");
const jwt = require("jsonwebtoken");

const redis = require("redis");
const client = new redis.createClient({
  url: process.env.REDIS_URI,
  // socket: {
  //   tls: true,
  //   rejectUnauthorized: false
  // }
});

client.on('error', function(err){
  console.log('Error ' + err);
});

client.connect();
console.log("Redis Connected!. (Heroku redis is not working need to use redis cloud - comment first");

module.exports = {
  registerUser: async function (req, res, next) {
      var userData = {
        userName: req.body.userName,
        accountNumber: req.body.accountNumber,
        emailAddress: req.body.emailAddress,
        identityNumber : req.body.identityNumber,
      };
      var newUser = await createUser(userData);
      if (newUser) {
        //client.DEL("usr"); //remove user key value
        res.status(200).json({ status: "success", data: newUser });
      } else {
        res
          .status(500)
          .json({ status: "error", data: "internal server error" });
      }
  },

  listUser : async function(req, res, next){
    let query = {};
    let users;

    if (req.query.accountnumber != "" && req.query.identitynumber == "") {        
        query = {accountNumber: {$regex: req.query.accountnumber, $options: "i" }};
        users = await findAll(query);
    } else if (req.query.accountnumber == "" && req.query.identitynumber != "") {        
        query = {identityNumber: {$regex: req.query.identitynumber, $options: "i" }};
        users = await findAll(query);
    } else if (req.query.accountnumber != "" && req.query.identitynumber != "") {        
        query = {$and: [{accountNumber: {$regex: req.query.accountnumber, $options: "i" }},{identityNumber: {$regex: req.query.identitynumber, $options: "i" }}]};
        users = await findAll(query);
    } else {
        // client.get('usr', async (err, usr) => {
        //   if (err) { throw err };
        //   if (usr) {            
        //     users = JSON.parse(usr);
        //   } else {            
            users = await findAll(query);
            client.set('usr', JSON.stringify(users));
        //   }
        // })
    }
    
    if(users){
        return res.status(200).json({"status": "success", "data": users});
    }else{
        return res.status(500).json({"status": "error", "data": "internal server error"});
    }
  },

  findUserId: async function (req, res, next) {
    var user = await findUser(req.params.id);
    if (user) {
      return res.status(200).json({ status: "success", data: user });
    } else {
      return res
        .status(500)
        .json({ status: "error", data: "internal server error" });
    }
  },

  updateUser: async function (req, res, next) {
    var id = req.params.id;
    req.body.updatedDate = new Date();
    
    var user = await updateUser(id, req.body);
    if (user) {
      //client.DEL("usr"); //remove user key value
      return res.status(200).json({ status: "success", data: user });
    } else {
      return res
        .status(500)
        .json({ status: error, data: "internal server error" });
    }
  },

  deleteUser: async function (req, res, next) {
    var id = req.params.id;
    var user = await deleteUser(id);
    if (user) {
      return res.status(200).json({ status: "success", data: "User deleted!." });
    } else {
      return res
        .status(500)
        .json({ status: "error", data: "internal server error" });
    }
  },

};
