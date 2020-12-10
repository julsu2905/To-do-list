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
router.get('/logout',authController.logout);
router.get('/:id',authController.protectUser,viewsUserController.getUser);
router.get("/project/:projectName",authController.protectUser,viewsUserController.getProjectPage);

 //POST
router.post('/login', authController.login);
router.post('/signup',userController.createUser,authController.login);
router.post('project/add/:projectName', projectController.addMember);
router.post('/home',authController.protectUser, projectController.postProject);
router.post('/:id',authController.protectUser,userController.updateMe);


module.exports = router;
