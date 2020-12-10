const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const AuthController = require("./authController");
const APIFeatures = require('../utils/apiFeatures');

const User = require("../models/userModel");
const Project = require("../models/projectModel");

//GET
exports.getSignUp = catchAsync(async (req, res, next) => {
	try {
		res.status(200).render("page/formsignup", {
			pageTitle: "Sign up",
		});
	} catch (error) {
		next(error);
	}
});

exports.getLandingPage = catchAsync(async (req, res, next) => {
	try {
		if (!res.locals.user) {
			res.status(200).render("page/landingpage", {
				pageTitle: "Landing Page",
			});
		} else {
			res.status(300).redirect("/home");
		}
	} catch (error) {
		next(error);
	}
});

exports.getLoginForm = (req, res) => {
	res.status(200).render("page/login", {
		pageTitle: "Log into your account",
	});
};

exports.getUser = catchAsync(async (req, res) => {
	const user = await User.findById(req.params.id);
	res.status(200).render("page/userinfo", {
		pageTitle: "Edit your account",
		user: user,
	});
});

exports.getProjectPage = catchAsync(async (req, res) => {
	const projectName = req.params.projectName;
	const project = await Project.find({'projectName' : projectName}).populate('projectTasks').populate('members');
	res.status(200).render("page/projectpage", {
		pageTitle: `Project ${projectName}`,
		project : project
	});
});

exports.getUserProjects = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);
	const limit = 10;
	const page = +req.query.page * 1 || 1;
	const totalItems = await Project.find({
		$or: [
			{ admin: decoded.id },
			{ member: { $elemMatch: { _id: decoded.id } } },
		],
	}).countDocuments();
	const features = new APIFeatures(
		Project.find({
			$or: [
				{ admin: decoded.id },
				{ member: { $elemMatch: { _id: decoded.id } } },
			],
		}),
		req.query
	)
		.filter()
		.sort()
		.limitFields()
		.paginate();

	const userProjects = await features.query;
	res.status(200).render("page/homepage", {
		projects: userProjects,
		results: userProjects.length,
		index: 1,
		pageTitle: "Home",
		currentPage: page,
		hasNextPage: limit * page < totalItems,
		hasPreviousPage: page > 1,
		nextPage: page + 1,
		previousPage: page - 1,
		lastPage: Math.ceil(totalItems / limit),
	});
});
//POST
