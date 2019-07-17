const express = require("express");

//Mongoose connection to MongoDB importing
require("./db/mongoose");

//Model importing
const User = require("./models/user");

const app = express();
const port = process.env.PORT || 3000;

//Parse data into the JSON format
app.use(express.json());

app.post("/users", (req, res) => {
	const user = new User(req.body);

	user
		.save()
		.then(() => {
			res.send(user);
		})
		.catch(error => {
			res.status(400).send(error);
		});
});

// app.get("/", (req, res) => {
// 	res.send("hi");
// });

app.listen(port, () => {
	console.log("Server is running on the port " + port);
});
