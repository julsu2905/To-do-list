const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/userModel");
const Project = require("../models/projectModel");

exports.postProject = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);

	const newProject = {
		projectName: req.body.projectName,
		memberQuantity: req.body.memberQuantity,
		description: req.body.description,
		admin: decoded.id,
	};
	const doc = await Project.create(newProject);
	await User.findByIdAndUpdate(
		decoded.id,
		{
			$push: { project: doc._id },
		},
		{
			new: true,
		}
	);

	res.status(201).json({
		status: "success",
		data: {
			data: doc,
		},
	});
});
