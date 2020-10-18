const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const viewsUserController = require('../controllers/viewsUserController');

const router = express.Router();

router.get('/',viewsUserController.getHomePage);


router.post('/login',authController.login);

router.get('/logout', authController.logout);

