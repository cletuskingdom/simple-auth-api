import { Request, Response } from "express";

const User = require('./../models/users');
const { signAccessToken } = require("./../helpers/jwt_helpers");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');


const handleErrors = (err: any) => {
	console.log(err.message, err.code);
	let errors: any = { email: '', password: '', name: '', phone: '' };

	// duplicate error code
	if (err.code === 11000) {
		errors.email = "Email exist";
		return errors;
	}

	// vlaidation errors
	if (err.message.includes('User validation failed')) {
		Object.values(err.errors).forEach(({ properties }: any) => {
			errors[properties.path] = properties.message;
		});
	}

	return errors;
}

const maxAge = 3 * 24 * 60 * 60; // Three days in seconds
const createToken = (id: number) => {
	return JWT.sign({ id }, process.env.TOKEN_SECRET, {
		expiresIn: maxAge
	})
}

const index = (req: Request, res: Response) => {
	res.status(201).json({
		"response_code": "201",
		"response_message": "Successful",
		"data":
		{
			"APP_NAME": process.env.APP_NAME
		}
	});
};

const register = async (req: Request, res: Response) => {
	const { name, email, phone, password } = req.body;

	try {
		// check if the user exist in the db - start
		// const doesExist = await User.findOne({ email });
		// if (doesExist) {
		// 	res.status(401).json({
		// 		"response_code": "401",
		// 		"response_message": "Email address already exist"
		// 	});
		// }
		// check if the user exist in the db - end

		const user = await User.create({ name, email, phone, password });
		const token = createToken(user.id);

		res.status(201).json({
			"response_code": "201",
			"response_message": "Resgistration successful",
			"data":
			{
				user, token
			}
		});
	} catch (err: any) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
};

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	if (!email || !password) {
		res.status(400).json({
			"response_code": "400",
			"response_message": "Unsuccessful, all fields are mandatory",
		});
	}
	// check if user exist with that email
	const user = await User.findOne({ email });

	// comfirm the password is correct with hashed password
	if (user && bcrypt.compare(password, user.password)) {
		const accessToken = JWT.sign({
			user: {
				name: user.name,
				email: user.email,
				id: user.id
			},
		}, process.env.TOKEN_SECRET,
			{ expiresIn: "5h" }) // setting the token to expires in 5hrs
		res.status(200).json({
			"response_code": "200",
			"response_message": "Login successful",
			"data": {
				user, accessToken
			}
		});
	} else {
		res.status(401).json({
			"response_code": "401",
			"response_message": "Invalid crendentials"
		});
	}
}

const users = async (req: Request, res: Response) => {
	const allUsers = await User.find({});
	res.status(200).json({
		"response_code": "200",
		"response_message": "Successful",
		"data": allUsers
	});
}

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
	index, register, login, users
};
