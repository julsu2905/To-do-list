const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const viewsUserController = require('../controllers/viewsUserController');
const UserController = require('../controllers/userController');

const router = express.Router();

/* router.get('/',viewsUserController.getHomePage);
 */router.get('/signup',viewsUserController.getSignUp);

/* 
router.post('/login',authController.login);

router.get('/logout', authController.logout); */

module.exports = router;