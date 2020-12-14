const mongoose = require("mongoose");
const Task = require("./taskModel");

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
	active: { type: Boolean, default: true },
});


const Project = mongoose.model("Project", projectSchema, "projects");
module.exports = Project;
