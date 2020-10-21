const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        trim : true,
        required : [true,'Please provide a username']
    },
    password : {
        type : String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          // This only works on CREATE and SAVE!!!
          validator: function(el) {
            return el === this.password;
          },
        message: 'Passwords are not the same!'
        }
    },
    email : {
            type: String,
            required: [true, 'Please provide your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please provide a valid email']
    },
    bio : {
        type : String
    },
    project : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    }]
});

//Encryption password for user
userSchema.pre('save', async function(next) {
    //Only run this function if password was actually modified
    if(!this.isModified('password')) return next();
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
    //Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
});

//User compare password and passwordConfirm
userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  }
const User = mongoose.model('User',userSchema);

module.exports = User;