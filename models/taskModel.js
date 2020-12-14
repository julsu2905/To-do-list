const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	taskName: {
		type: String,
		required: [true,'A task must have a name!']
	},
	status: {
		enum: ["assigned", "working", "pending", "done"],
		type: String,
		default: "assigned",
	},
	priority: {
		type: String,
		enum: ["Critical", "Normal", "High", "Low"],
		default: "Normal",
	},
	assignedMember: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	dueDate: {
		type: Date,
		required: [true,'A task must have due date']
	},
});

const Task = mongoose.model("Task", taskSchema,'tasks');
module.exports = Task;
