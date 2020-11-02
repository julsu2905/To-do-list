const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const viewsUserController = require("../controllers/viewsUserController");
const projectController = require('../controllers/projectController');

const router = express.Router();

//GET
router.get("/", viewsUserController.getLandingPage);
router.get("/signup", viewsUserController.getSignUp);
router.get("/home", authController.protectUser, viewsUserController.getHomePage);
router.get("/logout", authController.logout);
router.get('/login', viewsUserController.getLoginForm);
/* router.get('/user',viewsUserController.getUSer);


 *///POST
router.post("/login", authController.login);
router.post('/signup',userController.createUser,authController.login);
router.post('/home',authController.isLoggedIn,projectController.postProject);

module.exports = router;
