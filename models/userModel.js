const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = mongoose.Schema({
    username : {
        type : String,
        trim : true,
        required : [true,'Vui long nhap username']
    },
    password : {
        type : String,
        required : [true,'Vui long nhap password']
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
        type : String,
    },
    bio : {
        type : String
    },
    project : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Project'
    }]
});

const User = mongoose.model('User',userSchema);

module.exports = User;