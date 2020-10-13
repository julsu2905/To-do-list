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
    
});