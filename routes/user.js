
const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
 

// list user with filter by accountNumber & by IdentityNumber.
router.get('/list', passport.authenticate('jwt', {session: false}), userController.listUser);
// get user by id
router.get('/:id', passport.authenticate('jwt', {session: false}), userController.findUserId);
// update user by id
router.patch('/:id', passport.authenticate('jwt', {session: false}), userController.updateUser);
// delete
router.delete('/:id', passport.authenticate('jwt', {session: false}), userController.deleteUser);
// add user
router.post('/add',  userController.registerUser);
// login user
router.post('/login', authController.login);

 
 module.exports = router;