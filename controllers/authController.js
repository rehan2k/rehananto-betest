const { findByUsername } = require("../services/userService");
const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = {  
  login: async function (req, res, next) {
    errors = {};
    const username = req.body.username;
    const user = await findByUsername(username);
    if (!user) {
      errors.username = "Can't Generate Token!.";
      res.status(401).json(errors);
    }

    const payload = {
        id: user._id,
        userName: user.userName,
        accountNumber: user.last_name,
        emailAddress: user.emailAddress,
        identityNumber: user.identityNumber
    };
  
    jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
        if (err)
          res.status(500).json({
            error: "Error Generate Token!.",
            raw: err,
          });
        res.json({
          success: true,
          token: `${token}`,
          userName: user.userName,
          accountNumber: user.last_name,
          id: user.id,
          emailAddress: user.emailAddress,
          identityNumber: user.identityNumber
        });
    });
      
  },

  
};
