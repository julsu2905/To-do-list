const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const factory = require("./handlerFactory");

const User = require("../models/userModel");

exports.getSignUp =catchAsync(async(req, res, next) => {
    try{
    res.status(200).render("page/formsignup");
    }catch (error){
        next(error);
    }
})

exports.getHomePage =catchAsync( async (req,res,next) =>{
    try{
        res.status(200).render("page/homepage");
        }catch (error){
            next(error);
        }
})
