const mongoose = require('mongoose');
const projectController = require('../controllers/projectController');

const projectSchema = mongoose.Schema({
    projectName : {
        type : String,
        required : true
    },
    memberQuantity : {
        type : Number,
        required : true
    },
    admin : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Task'
    }],
    members : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
});

const Project = mongoose.model('Project',projectSchema);
module.exports = Project;