const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const User = require("../models/userModel");

//Create User
/* exports.createUser = factory.createOne(User);
 */

exports.createUser = catchAsync(async (req, res, next) => {
	const { email, password, confirmPassword } = req.body;
	await User.create({
		email: email,
		password: password,
		passwordConfirm: confirmPassword,
		bio:'',
		projects:[]
	});
	res.redirect('/login');
});
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
	const filteredBody = filterObj(req.body, "username", "email");
	console.log(req.files.photo);
	const updateUser = await User.findByIdAndUpdate(decoded.id, filteredBody, {
		new: true,
		runValidators: true,
	});
	res.status(200).json({
		status: "success",
		data: {
			user: updateUser,
		},
	});
});
