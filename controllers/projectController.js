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
	const project = await Project.findOne({ projectName: req.body.projectName });
	if (project) return next(new AppError("Project's name have already taken!"));
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
const checkProjectQuantity = async (projectName) => {
	const project = await Project.findOne({
		projectName: projectName,
	}).select("members memberQuantity");
	return project.isFull(project.members.length, project.memberQuantity);
};
const checkExist = async (projectName, user) => {
	var doc = await Project.findOne({ projectName: projectName });
	return !(
		doc.members.indexOf(user.id) != -1 || user.myProjects.indexOf(doc.id) != -1
	);
};
exports.addMember = catchAsync(async (req, res, next) => {
	const projectName = req.params.projectName;
	const { email } = req.body;
	var user = await User.findOne({ email: email });
	if (!user) return next(new AppError("Can't find this user !", 404));
	else if (checkProjectQuantity(projectName))
		return next(new AppError("Project is full !", 404));
	else if (checkExist(projectName, user))
		return next(new AppError("User have already in project !", 404));
	else {
		doc = await Project.findOneAndUpdate(
			{
				projectName: projectName,
				"members._id": { $ne: user._id },
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
				"myProjects._id": { $ne: doc._id },
			},
			{
				$addToSet: { myProjects: doc._id },
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
			data: doc,
		},
	});
});

exports.deleteProject = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);

	await User.findByIdAndUpdate(decoded.id, {
		$pull: { project: { projectName: req.params.projectName } },
	});
	await Project.findOneAndRemove({ projectName: req.params.projectName });
	res.status(200).json({
		status: "success",
		data: null,
	});
});

exports.getAllProjects = factory.getAll(Project);

exports.getProject = factory.getOne(Project);
