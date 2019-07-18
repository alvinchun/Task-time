const express = require("express");

//Mongoose connection to MongoDB importing
require("./db/mongoose");

//Model importing
const User = require("./models/User");
const Task = require("./models/Task");

const app = express();
const port = process.env.PORT || 3000;

//Parse data into the JSON format
app.use(express.json());

//Promise chaining (old) ===> Async/await syntax(new, trending pattern)

// Users

app.post("/users", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		res.status(201).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.get("/users", async (req, res) => {
	try {
		const users = await User.find({});
		return res.send(users);
	} catch (e) {
		return res.status(500).send();
	}
});

app.get("/users/:id", async (req, res) => {
	const _id = req.params.id;

	try {
		const user = await User.findById(_id);

		if (!user) {
			return res.status(404).send();
		}

		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

app.patch("/users/:id", async (req, res) => {
	//req.body === object
	const updates = Object.keys(req.body);
	const allowedUpdates = ["name", "email", "password", "age"];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});

		if (!user) {
			return res.status(404).send();
		}

		res.status(200).send(user);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.delete("/users/:id", async (req, res) => {
	_id = req.params.id;
	try {
		const user = await User.findByIdAndDelete(_id);

		if (!user) {
			return res.status(404).send();
		}
		res.send(user);
	} catch (e) {
		res.status(500).send();
	}
});

// Tasks

app.post("/tasks", async (req, res) => {
	const task = new Task(req.body);
	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}

	//Promise chaining syntax

	// task
	// 	.save()
	// 	.then(() => {
	// 		res.status(201).send(task);
	// 	})
	// 	.catch(error => {
	// 		res.status(400).send(error);
	// 	});
});

app.get("/tasks", async (req, res) => {
	const tasks = await Task.find({});

	try {
		res.send(tasks);
	} catch (e) {
		res.status(500).send();
	}

	// Task.find({})
	// 	.then(tasks => {
	// 		res.send(tasks);
	// 	})
	// 	.catch(error => {
	// 		res.status(500).send();
	// 	});
});

app.get("/tasks/:id", async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findById(_id);

		if (!task) {
			return res.status(404).send();
		}
		res.send(task);
	} catch (e) {
		res.status(500).send();
	}

	// Task.findById(_id)
	// 	.then(task => {
	// 		if (!task) {
	// 			return res.status(404).send();
	// 		}

	// 		res.send(task);
	// 	})
	// 	.catch(e => {
	// 		res.status(500).send();
	// 	});
});

//Setting up http endpoint for updating a task by its id
app.patch("/tasks/:id", async (req, res) => {
	//req.body === object
	const _id = req.params.id;
	const updates = Object.keys(req.body);
	const allowedUpdates = ["completed", "description"];
	const isValidOperation = updates.every(update =>
		allowedUpdates.includes(update)
	);

	if (!isValidOperation) {
		return res.status(400).send({ error: "Invalid updates!" });
	}

	try {
		const task = await Task.findByIdAndUpdate(_id, req.body, {
			new: true,
			runValidators: true
		});

		if (!task) {
			return res.status(404).send();
		}

		res.status(200).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

app.delete("/tasks/:id", async (req, res) => {
	_id = req.params.id;
	try {
		const task = await Task.findByIdAndDelete(_id);

		if (!task) {
			return res.status(404).send();
		}

		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

app.listen(port, () => {
	console.log("Server is running on the port " + port);
});
