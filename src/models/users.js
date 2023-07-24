const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: [true, "Please enter an email"],
		unique: true,
		lowercase: true,
		validate: [
			{
				validator: function (value) {
					return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
				},
				message: "Please enter a valid email",
			},
		],
	},
	phone: {
		type: String,
		required: [true, "Please enter your phone number"],
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimum  password lenght is 6 characters"],
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
	console.log("User has been created");
	next();
});

// fire a function before doc saved to db
userSchema.pre("save", function (next) {
	console.log("User is about to be created", this);
	next();
});

module.exports = mongoose.model("User", userSchema);
