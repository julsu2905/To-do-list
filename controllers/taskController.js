const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const Task = require('../models/taskModel');

exports.getAllProjects = factory.getAll(Task);

exports.createTask = factory.createOne(Task);