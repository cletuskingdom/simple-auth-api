import { Request, Response } from "express";

const jwt = require('jsonwebtoken');
const User = require('./../models/users');

const handleErrors = (err: any) => {
	console.log(err.message, err.code);
	let errors: any = { email: '', password: '', name: '', phone: '' };

	// vlaidation errors
	if (err.message.includes('User validation failed')) {
		Object.values(err.errors).forEach(({ properties }: any) => {
			errors[properties.path] = properties.message;
		});
	}
}

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

const register = async (req: Request, res: Response) => {
	const { name, email, phone, password } = req.body;

	try {
		const user = await User.create({ name, email, phone, password });

		res.status(201).json({
			"response_code": "201",
			"response_message": "Successful",
			"data": user
		});
	} catch (err: any) {
		const errors = handleErrors(err);
		res.status(400).send("error, user not created");
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
	index, register
};
