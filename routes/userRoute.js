const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const viewsUserController = require("../controllers/viewsUserController");
const projectController = require("../controllers/projectController");

const router = express.Router();

//GET
router.get("/", authController.isLoggedIn, viewsUserController.getLandingPage);
router.get("/signup", viewsUserController.getSignUp);
router.get("/home", authController.protectUser, viewsUserController.getUserProjects);
router.get('/login', viewsUserController.getLoginForm);
router.get("/logout", authController.logout);


//POST
router.post("/", authController.login);
router.post("/login", authController.login);
router.post("/signup", userController.createUser, authController.login);
router.post("/home", authController.protectUser, projectController.postProject);

router.get("/:id", authController.protectUser, viewsUserController.getUser);
router.post("/:id", authController.protectUser, userController.updateMe);

router.get(
	"/project/:projectName",
	authController.protectUser,
	viewsUserController.getProjectPage
);

module.exports = router;
