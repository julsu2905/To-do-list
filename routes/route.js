const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const viewsUserController = require("../controllers/viewsUserController");
const projectController = require('../controllers/projectController');

const router = express.Router();

//GET

router.post('/project/:projectName',authController.protectUser, projectController.addMember);


 //POST


module.exports = router;