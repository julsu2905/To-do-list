const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const viewsUserController = require("../controllers/viewsUserController");
const projectController = require('../controllers/projectController');

const router = express.Router();

//GET
router.get("/",authController.isLoggedIn, viewsUserController.getLandingPage);
router.get("/signup", viewsUserController.getSignUp);
router.get("/home", authController.protectUser, viewsUserController.getUserProjects);
router.get('/login', viewsUserController.getLoginForm);

router.get("/project/:projectName",authController.protectUser,viewsUserController.getProjectPage);

router.get('/me',authController.protectUser,viewsUserController.getUser);


 //POST



router.post('/home',authController.protectUser, projectController.postProject);
router.post('/me',authController.protectUser,userController.updateMe);


module.exports = router;
