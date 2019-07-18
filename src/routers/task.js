const express = require("express");
const router = new express.Router();
const Task = require("../models/Task");

//Task CRUD

router.post("/tasks", async (req, res) => {
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

router.get("/tasks", async (req, res) => {
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

router.get("/tasks/:id", async (req, res) => {
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
router.patch("/tasks/:id", async (req, res) => {
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
		const task = await Task.findById(req.params.id);

		updates.forEach(update => {
			task[update] = req.body[update];
		});

		await task.save();

		// const task = await Task.findByIdAndUpdate(_id, req.body, {
		// 	new: true,
		// 	runValidators: true
		// });

		if (!task) {
			return res.status(404).send();
		}

		res.status(200).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.delete("/tasks/:id", async (req, res) => {
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

module.exports = router;
