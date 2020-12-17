const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");

exports.createProject = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);
	let project = await Project.findOne({ projectName: req.body.projectName, active : true });
	if (project && project.active == true) return next(new AppError("Project's name have already taken!"));
	else {
		const newProject = {
			projectName: req.body.projectName,
			memberQuantity: req.body.memberQuantity,
			description: req.body.description,
			admin: decoded.id,
			members: [decoded.id],
		};
		const doc = await Project.create(newProject);
		await User.findByIdAndUpdate(
			decoded.id,
			{
				$push: { myProjects: doc._id },
			},
			{
				new: true,
			}
		);

		res.status(201).json({
			status: "success",
			projectName: doc.projectName,
			data: {
				data: doc,
			},
		});
	}
});

exports.addMember = catchAsync(async (req, res, next) => {
	const projectName = req.params.projectName;
	const { email } = req.body;
	let user = await User.findOne({ email: email });
	let project = await Project.findOne({
		projectName: projectName, active : true
	}).select("members memberQuantity");
	if (!user) return next(new AppError("Can't find this user !", 404));
	else if (project.members.length + 1 > project.memberQuantity)
		return next(new AppError("Project is full !", 404));
	else if (
		project.members.indexOf(user.id) != -1 ||
		user.myProjects.indexOf(project.id) != -1
	)
		return next(new AppError("User have already in project !", 404));
	else {
		project = await Project.findOneAndUpdate(
			{
				projectName: projectName,
				members: { $ne: user._id },
			},
			{
				$addToSet: {
					members: user.id,
				},
			},
			{ new: true, upsert: false }
		);

		user = await User.findOneAndUpdate(
			{
				email: email,
				myProjects: { $ne: project._id },
			},
			{
				$addToSet: { myProjects: project._id },
			},
			{
				new: true,
				upsert: false,
			}
		);
	}

	res.status(201).json({
		status: "success",
		data: {
			data: project,
		},
	});
});

exports.deleteProject = catchAsync(async (req, res, next) => {
	let project = await Project.findByIdAndUpdate(req.params.id, {
		active: false,
	});
	if (!project) {
		return next(new AppError("No document found with that ID", 404));
	}

	res.redirect("/home");
});

exports.getAllProjects = factory.getAll(Project);

exports.getProject = factory.getOne(Project);
