if (process.env.NODE_ENV !== 'production') { 
    require('dotenv').config();  
}

module.exports = {
    dbUrl : process.env.DATABASE_URL_ATLAS,
    secret : process.env.SECRET,
    port : process.env.PORT
};