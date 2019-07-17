const mongoose = require("mongoose");
const validator = require("validator");

mongoose.connect("mongodb://127.0.0.1:27017/task-time-api", {
	useNewUrlParser: true,
	useCreateIndex: true
});

const User = mongoose.model("User", {
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		validate(value) {
			if (!validator.isEmail(value)) {
				throw new Error("Email is invalid");
			}
		}
	},
	age: {
		type: Number,
		validate(value) {
			if (value < 0) {
				throw new Error("Age must be a positivie number");
			}
		}
	}
});

const me = new User({
	name: "Alvin",
	email: "alvin@msn.com"
});

me
	.save()
	.then(() => {
		console.log(me);
	})
	.catch(error => {
		console.log("Error", error);
	});

// const Task = mongoose.model("Taskk", {
// 	description: {
// 		type: String
// 	},
// 	completed: {
// 		type: Boolean
// 	}
// });

// const task = new Task(
// 	{ description: "Algorithm", completed: false },
// 	{ description: "Web Server Dev", completed: true }
// );

// task
// 	.save()
// 	.then(() => {
// 		console.log(task);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});
