const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const AuthController = require('./authController');

const User = require("../models/userModel");
const Project = require("../models/projectModel");


//GET
exports.getSignUp = catchAsync(async (req, res, next) => {
	try {
		res.status(200).render("page/formsignup", {
			pageTitle: 'Sign up'
		});
	} catch (error) {
		next(error);
	}
});

exports.getHomePage = catchAsync(async (req, res, next) => {
	try {
		res.status(200).render("page/homepage", {
			pageTitle: 'Home'
		});
	} catch (error) {
		next(error);
	}
});

exports.getLandingPage = catchAsync(async (req, res, next) => {
	try {
		res.status(200).render("page/landingpage", {
			pageTitle: 'Landing Page'
		});
	} catch (error) {
		next(error);
	}
});

exports.getLoginForm = (req, res) => {
	res.status(200).render('page/login', {
		pageTitle: 'Log into your account'
	});
};


exports.getUser = catchAsync(async (req, res) => {
	const user = await User.findById(req.params.id);
	res.status(200).render('page/userinfo', {
		pageTitle: 'Edit your account',
		user : user
	});
});

exports.getProjectPage = catchAsync(async (req, res) =>{
	const projectName = req.params.projectName;
	res.status(200).render('page/projectpage',{
		pageTitle : `Project ${projectName}`
	})
});
//POST


