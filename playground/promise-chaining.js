require("../src/db/mongoose");
const User = require("../src/models/User");

// User.findByIdAndUpdate("5d2f97a67aa36f756ae050cd", { age: 1 })
// 	.then(user => {
// 		console.log(user);
// 		return User.countDocuments({ age: 1 });
// 	})
// 	.then(result => {
// 		console.log(result);
// 	})
// 	.catch(error => {
// 		console.log(error);
// 	});

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({ age });

	return count;
};

updateAgeAndCount("5d2f7a861c6c566d855b9887", 100)
	.then(count => {
		console.log(count);
	})
	.catch(error => {
		console.log(error);
	});
