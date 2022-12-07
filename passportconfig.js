const ppjwt = require('passport-jwt');
const Strategy = ppjwt.Strategy;
const ExtractJWT = ppjwt.ExtractJwt;
const User = require('./models/user');
const config = require('./config');

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret
};
module.exports = passport => {
    passport.use(new Strategy(opts, (payload, done) => {
            User.findById(payload.id).then(user => {
               if(user){
                   return done(null, {
                        userName: user.userName,
                        accountNumber: user.last_name,
                        emailAddress: user.emailAddress,
                        identityNumber: user.identityNumber
                   });
               }
               return done(null, false);
            }).catch(err => console.error(err));
        })
    );
};