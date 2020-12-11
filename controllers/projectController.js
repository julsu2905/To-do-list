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
		members : [decoded.id]
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
exports.addMember = catchAsync(async (req, res, next) => {
	const projectName = req.params.projectName;

	const { name } = req.body;
	const user = await User.find({ email: name }).populate('project');
	if (!user) return next(new AppError("No user found !", 404));
	const doc = await Project.findOneAndUpdate(
		{ projectName: projectName },
		{
			$push: {
				members: user._id,
			},
		},
		{ new: true }
	);
	if(!doc) return next(new AppError("Error !", 404));
	res.status(201).json({
		status: "success",
		data: {
			data: doc,
		},
	});
});

exports.deleteProject = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
	  req.cookies.jwt,
	  process.env.JWT_SECRET
	);
  
	await User.findByIdAndUpdate(decoded.id, { $pull :{project : {projectName :req.params.projectName}}});
	await Project.findOneAndRemove({projectName : req.params.projectName});
	res.status(200).json({
	  status: 'success',
	  data: null
	});
  });

exports.getAllProjects = factory.getAll(Project);

exports.getProject = factory.getOne(Project);


