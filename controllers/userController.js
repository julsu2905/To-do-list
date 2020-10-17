const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const User = require('../models/userModel');

//Create User
exports.createAdmin = factory.createOne(UserAdmin);

//Get All User
exports.getAllAdmins = factory.getAll(UserAdmin);

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
  };