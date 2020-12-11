const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const Project = require('../models/projectModel');``
const User = require("../models/userModel");

//Create User
exports.createUser = factory.createOne(User);

const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach(el => {
	  if(allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
  }
/* exports.createUser = catchAsync(async (req, res, next) => {
	const { email, password, confirmPassword } = req.body;
	await User.create({
		email: email,
		password: password,
		passwordConfirm: confirmPassword,
		bio:'',
		projects:[]
	});
	res.redirect('/login');
}); */
exports.getMe = (req, res, next) => {
	req.params.id = req.user.id;
	next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);
	console.log(decoded);

	if (req.body.password || req.body.passwordConfirm) {
		return next(
			new AppError(
				"This route is not for password updates. Please updateMyPassword",
				400
			)
		);
	}
	//2) Filterer out unwanted fields names that are not allowed to be updated
	const filteredBody = filterObj(req.body, "email");
	const updateUser = await User.findByIdAndUpdate(decoded.id, filteredBody, {
		new: true,
		runValidators: true,
	});
	res.status(200).redirect(updateUser._id,{
		data: {
			user: updateUser,
		},
	});
});
exports.deleteMe = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
	  req.cookies.jwt,
	  process.env.JWT_SECRET
	);
  
	await User.findByIdAndRemove(decoded.id);
	res.status(200).json({
	  status: 'success',
	  data: null
	});
  });

//Get All UserAdmin
exports.getAllUsers = factory.getAll(User);
