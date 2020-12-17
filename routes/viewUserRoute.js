const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const viewsUserController = require("../controllers/viewsUserController");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");
const router = express.Router();

//GET
router.get("/", authController.isLoggedIn, viewsUserController.getLandingPage);
router.get("/signup", viewsUserController.getSignUp);
router.get(
	"/home",
	authController.protectUser,
	viewsUserController.getUserProjects
);
router.get("/login", viewsUserController.getLoginForm);

router.get(
	"/project/:projectName",
	authController.protectUser,
	viewsUserController.getProjectPage
);

router.get("/me", authController.protectUser, viewsUserController.getUser);

//POST

router.post("/project/delete/:id", projectController.deleteProject);

router.post("/me", authController.protectUser, userController.updateMe);
router.post('/project/tasks/delete/:id',taskController.deleteTask);
module.exports = router;
