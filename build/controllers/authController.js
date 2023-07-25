"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('./../models/users');
const { signAccessToken } = require("./../helpers/jwt_helpers");
const bcrypt = require("bcrypt");
const JWT = require('jsonwebtoken');
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', name: '', phone: '' };
    // duplicate error code
    if (err.code === 11000) {
        errors.email = "Email exist";
        return errors;
    }
    // vlaidation errors
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};
const maxAge = '5h'; // Token should expire in 5hrs
const createToken = (id) => {
    return JWT.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    });
};
const index = (req, res) => {
    res.status(200).json({
        "response_code": "200",
        "response_message": "Successful",
        "data": {
            "APP_NAME": process.env.APP_NAME,
            "VERSION": "1.0.0",
        }
    });
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const user = yield User.create({ name, email, phone, password });
        const token = createToken(user.id);
        res.status(201).json({
            "response_code": "201",
            "response_message": "Resgistration successful",
            "data": {
                user, token
            }
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            "response_code": "400",
            "response_message": "Unsuccessful, all fields are mandatory",
        });
    }
    // check if user exist with that email
    const user = yield User.findOne({ email });
    // comfirm the password is correct with hashed password
    if (user && bcrypt.compare(password, user.password)) {
        // const accessToken = JWT.sign({
        // 	user: {
        // 		name: user.name,
        // 		email: user.email,
        // 		id: user.id
        // 	},
        // }, process.env.TOKEN_SECRET,
        // 	{ expiresIn: "5h" })
        const accessToken = createToken(user.id);
        res.status(200).json({
            "response_code": "200",
            "response_message": "Login successful",
            "data": {
                user, accessToken
            }
        });
    }
    else {
        res.status(401).json({
            "response_code": "401",
            "response_message": "Invalid crendentials"
        });
    }
});
const users = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = req.user.id; // here is the user_id of the logged in user
    // const user = await User.findById(user_id);
    const user = yield User.find({});
    if (user) {
        res.status(200).json({
            "response_code": "200",
            "response_message": "User found",
            "data": user
        });
    }
    else {
        res.status(404).json({
            "response_code": "404",
            "response_message": "User not found",
        });
    }
});
// Export the controller functions
module.exports = {
    index, register, login, users
};
