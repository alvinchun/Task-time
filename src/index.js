const express = require("express");

//Mongoose connection to MongoDB importing
require("./db/mongoose");

//Model importing
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

//Express setup
const app = express();
const port = process.env.PORT || 3000;

//Parse data into the JSON format
app.use(express.json());

//Calling Models in different router files
app.use(userRouter, taskRouter);
// app.use(taskRouter);

//Promise chaining (old) ===> Async/await syntax(new, trending pattern)

app.listen(port, () => {
	console.log("Server is running on the port " + port);
});

const bcrypt = require("bcryptjs");

const myFunction = async () => {
	const password = "Red12345!";
	// hashedPassword
	const hashedPassword = await bcrypt.hash(password, 8);

	console.log(password);
	console.log(hashedPassword);

	const isMatch = await bcrypt.compare("red12345!", hashedPassword);

	console.log(isMatch);

	//encryption = you can get your password back from changed password to original value
	//ex) alvin -> sldifjlisdjflif -> alvin (returnable)

	//hashing algorithm = you cannot get your password back (one way hashing method)
	//ex) alvin -> sldifjlisdfjlf (one way)
};

myFunction();
