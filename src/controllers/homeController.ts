import { Request, Response } from "express";

const jwt = require('jsonwebtoken');
const User = require('./../models/users')

const index = (req: Request, res: Response) => {
	res.status(200).json({
		"response_code": "200",
		"response_message": "Successful",
		"data": [
			{
				"APP_NAME": process.env.APP_NAME
			}
		]
	});
};

const login = async (req: Request, res: Response) => {
	const { name, email, phone, password } = req.body;

	try {
		const user = await User.create({ name, email, phone, password });

		res.status(201).json({
			"response_code": "201",
			"response_message": "Successful",
			"data": user
		});
	} catch (error: any) {

		res.status(404).json({
			"response_code": "404",
			"response_message": error.message
		});
	}
};

// const addUsers = (req, res) => {
// 	const users = new User({
// 		name: req.body.name,
// 		email: req.body.email,
// 		phone: req.body.phone,
// 		image: req.file.filename,
// 		password: req.body.password,
// 	});
// 	var save_user = users.save();
// 	if (save_user) {
// 		req.session.message = {
// 			type: "success",
// 			message: "User added successfully",
// 		};
// 		res.redirect("/");
// 	} else {
// 		res.json({
// 			type: "danger",
// 			message: err.message,
// 		});
// 	}
// };

// Export the controller functions
module.exports = {
	index, login
};
