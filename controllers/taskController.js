const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");
const Task = require("../models/taskModel");
const Project = require("../models/projectModel");

exports.getAllTasks = factory.getAll(Task);

exports.createTask = catchAsync(async (req, res, next) => {
	if (req.body.assignedMember == 0)
		return next(new AppError("Please assign a member!", 400));
	const newTask = {
		taskName: req.body.taskName,
		dueDate: req.body.dueDate,
		priority: req.body.priority,
		assignedMember: req.body.assignedMember,
	};
	const doc = await Task.create(newTask);
	const user = await User.findByIdAndUpdate(
		req.body.assignedMember,
		{
			$push: {
				userTasks: doc._id,
			},
		},
		{
			new: true,
		}
	);
	const pro = await Project.findOneAndUpdate(
		{ projectName: req.params.projectName, active: true },
		{
			$push: {
				projectTasks: doc.id,
			},
		}
	);
	if (!user) return next(new AppError("Error", 404));
	res.status(201).json({
		status: "success",
		data: {
			data: pro,
		},
	});
});
exports.getTask = catchAsync(async (req, res, next) => {
	const task = await Task.findById(req.body.id).populate(
		"assignedMember",
		"+email"
	);
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);
	const project = await Project.findOne({
		projectName: req.body.projectName,
	}).populate("admin");
	let adminLoggedIn = true;
	if (project.admin.id != decoded.id) {
		adminLoggedIn = false;
	}
	console.log(adminLoggedIn);
	res.status(201).json({
		status: "success",
		data: {
			task: task,
			taskId: task.id,
			adminLoggedIn: adminLoggedIn,
		},
	});
});
exports.changeStatusTask = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);

	const task = await Task.findById(req.params.id);
	const project = await Project.findOne({ projectName: req.body.projectName });
	if (decoded.id == task.assignedMember || decoded.id == project.admin) {
		const doc = await Task.findByIdAndUpdate(req.params.id, {
			status: req.body.status,
		});
		res.status(201).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	} else return next(new AppError("You cannot change this task status!", 404));
});
exports.deleteTask = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);
	const project = await Project.findOne({ projectName: req.body.projectName });
	const task = await Task.findById(req.params.id);
	if (!task) {
		return next(new AppError("No document found with that ID", 404));
	}
	if (decoded.id != project.admin || task.status != "assigned")
		return next(new AppError("You cannot delete this task!", 404));
	else {
		const newProject = await Project.findOneAndUpdate(
			{ projectName: req.body.projectName },
			{
				$pull: {
					projectTasks: task.id,
				},
			}
		);
		const assigned = await User.findByIdAndUpdate(task.assignedMember, {
			$pull: {
				userTasks: task.id,
			},
		});
		const doc = await Task.findByIdAndDelete(req.params.id);
		res.status(201).json({
			status: "success",
			data: {
				data: null,
			},
		});
	}
});

exports.changeAssign = catchAsync(async (req, res, next) => {
	const decoded = await promisify(jwt.verify)(
		req.cookies.jwt,
		process.env.JWT_SECRET
	);
	const project = await Project.findOne({ projectName: req.body.projectName });
	const task = await Task.findById(req.params.id);
	if (!task) {
		return next(new AppError("No document found with that ID", 404));
	}
	if (decoded.id != project.admin || task.status != "assigned")
		return next(new AppError("You cannot re-assign this task!", 404));
	else {
		const oldAssignee = await User.findByIdAndUpdate(task.assigned, {
			$pull: {
				userTasks: task.id,
			},
		});
		const newAssignee = await User.findByIdAndUpdate(req.body.assignedMember, {
			$push: {
				userTasks: task.id,
			},
		});
		const doc = await Task.findByIdAndUpdate(req.params.id, {
			assignedMember: req.body.assignedMember,
		});

		res.status(201).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	}
});
