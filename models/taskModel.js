const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskName : {
        type : String,
        required : true
    },
    progress :{
        enum : ['asigned' ,'working' ,'pending' ,'done']
        ,
        default : 'asigned',
    },
    priority :{
        type : String,
        required : true
    },
    asignedMember :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    dueDate :{
        type : Date,
        required : true
    }
});

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;