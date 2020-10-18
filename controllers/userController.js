const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory');

const User = require('../models/userModel');

//Create User
exports.createUser = factory.createOne(User);


exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
  };