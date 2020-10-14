const mongoose = require('mongoose');

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