require("../src/db/mongoose");
const Task = require("../src/models/Task");

// Task.findByIdAndDelete("5d2f97b57aa36f756ae050cf")
// 	.then(task => {
// 		console.log(task);
// 		return Task.countDocuments({ completed: false });
// 	})
// 	.then(result => {
// 		console.log(result);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

const deleteTaskAndCount = async id => {
	const task = await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({ completed: false });

	return count;
};

deleteTaskAndCount("5d2eb4dfaf709045f80dbbb3")
	.then(count => {
		console.log(count);
	})
	.catch(error => {
		console.log(error);
	});
