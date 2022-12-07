const User = require('./../models/user');

module.exports = {
    findAll : async function(query){
        try{
            let users;
            if(Object.keys(query).length === 0) {
                users = await User.find().sort({$natural:-1});
            }else{
                users = await User.find(query).sort({$natural:-1});
            }
            
            if(users){
                 return users;
            }else{
                 return false;
            }
        }catch (e) {
            console.log(e);
        }
    },

    findByUsername : async function(username) {
        try {
            var user = await User.findOne({username});
            return user;
        } catch (e) {
            console.log(e);
        }
    },
    
    findUser : async function (id){
        try{
            
            var user = await User.findById(id);
            return user;
        }catch(e){
            console.log(e);
        }
    },
    
    createUser : async function(user){
        const userData = user;
        try {
            let newUser = await new User(userData).save();
            if(newUser){
                return newUser;
            }else{
                return false;
            }
        }catch (e) {
            console.log(e);
        }
    },
    
    updateUser : async function(id, user){
        try{
            
            var updatedUser = await User.findByIdAndUpdate(id, user);
            if(updatedUser){
                return updatedUser
            }else{
                return false;
            }
        }catch (e) {
            console.log(e)
        }
    },
    
    deleteUser : async function (id) {
        try {
            var deletedUser = await User.findByIdAndRemove(id);
            if(deletedUser){
                return true
            }else{
                return false
            }

        }catch (e) {
            console.log(e)
        }
    }
};