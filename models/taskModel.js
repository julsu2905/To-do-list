const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    taskName : {
        type : String,
        required : true
    },
    progress :{
        asigned : Boolean,
        working : Boolean,
        pending : Boolean,
        done : Boolean,
        default : asigned,
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