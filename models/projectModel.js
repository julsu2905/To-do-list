const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
	projectName: {
		type: String,
		required: true,
	},
	memberQuantity: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
		required: false,
	},
	admin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	projectTasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task",
		},
	],
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
});

projectSchema.methods.isFull = function (
	projectMemberLength,memberQuantity
) {
	return ((projectMemberLength +1) > memberQuantity)?true:false;
};

const Project = mongoose.model("Project", projectSchema,'projects');
module.exports = Project;
