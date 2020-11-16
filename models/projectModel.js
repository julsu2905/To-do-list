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
	tasks: [
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

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
