const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const User = require("../models/userModel");

//GET
exports.getSignUp = catchAsync(async (req, res, next) => {
	try {
		res.status(200).render("page/formsignup");
	} catch (error) {
		next(error);
	}
});

exports.getHomePage = catchAsync(async (req, res, next) => {
	try {
		res.status(200).render("page/homepage");
	} catch (error) {
		next(error);
	}
});

exports.getLandingPage = catchAsync(async (req, res, next) => {
	try {
		res.status(200).render("page/landingpage");
	} catch (error) {
		next(error);
	}
});

exports.getLoginForm = (req, res) => {
    res.status(200).render('page/login', {
      pageTitle: 'Log into your account'
    });
  };

//POST
exports