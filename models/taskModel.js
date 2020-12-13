const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
	taskName: {
		type: String,
		required: true,
	},
	status: {
		enum: ["asigned", "working", "pending", "done"],
		type: String,
		default: "asigned",
	},
	priority: {
		type: String,
		enum: ["Critical", "Normal", "High", "Low"],
		default: "Normal",
	},
	asignedMember: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	dueDate: {
		type: Date,
		required: true,
	},
});

const Task = mongoose.model("Task", taskSchema,'tasks');
module.exports = Task;
