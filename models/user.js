const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName : {
        type : String,
        required : [true, 'User Name is required'],
        unique: true
    },
    accountNumber : {
        type : String,
        required : [true, 'Account Number is required'],
        unique: true
    },
    emailAddress : {
        type : String,
        required : [true, 'Email is not required'],
        unique: true
    },
    identityNumber : {
        type : String,
        required : [true, 'Identity Number is required'],
        unique: true
    },
    createdDate : {
        type : Date,
        required : [false,""],
        default : Date.now
    },
    updatedDate : {
        type : Date,
        required : [false,""],
        default : Date.now
    },
    
},{collection: 'mUser'});        //collection mUser = master user

module.exports = User = mongoose.model("User", UserSchema);
