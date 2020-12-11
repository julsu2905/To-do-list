const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const projectController = require("../controllers/projectController");
 /* const taskController = require("../controllers/taskController"); */
const router = express.Router();

//GET
router.post("/login", authController.login);

router.get("/logout", authController.logout);


router.patch("/updateMyPassword", authController.updatePassword);
router.delete("/deleteMe", userController.deleteMe);
router.get("/me", userController.getMe);
router.patch(
	"/updateMe",
	// userAdminController.uploadAdminPhoto,
	// userAdminController.resizeAdminPhoto,
	userController.updateMe
);
//POST

router
	.route("/users")
	.get(userController.getAllUsers)
	.post(userController.createUser);

router
	.route("/projects")
	.get(projectController.getAllProjects)
	.post(projectController.postProject);
router
	.route("/projects/:projectName")
	.get(projectController.getProject)
	.put(projectController.addMember)
	.post(projectController.deleteProject);

/* router
	.route("/tasks")
	.get(projectController.getAllTasks)
	.post(projectController.postProject);
router
	.route("/tasks/:id")
	.get(taskController.getTask)
	.patch(projectController.addMember)
	.delete(projectController.deleteProject); */
module.exports = router;
