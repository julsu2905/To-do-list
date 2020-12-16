const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const Task = require("../models/taskModel");
const User = require("../models/userModel");

exports.getAllTasks = factory.getAll(Task);

exports.createTask = catchAsync(async (req, res, next) => {
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
	if (!user) return next(new AppError("Error", 404));
	res.status(201).json({
		status: "success",
		data: {
			data: doc,
		},
	});
});
