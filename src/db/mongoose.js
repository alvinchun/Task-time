const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/task-time-api", {
	useNewUrlParser: true,
	useCreateIndex: true
});

const Task = mongoose.model("Taskk", {
	description: {
		type: String,
		required: true,
		trim: true
	},
	completed: {
		type: Boolean,
		required: false,
		default: false
	}
});
