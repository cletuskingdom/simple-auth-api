"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index = (req, res) => {
    // res.json({
    // 	'response_code': process.env.APP_NAME,
    // 	'response_message': "Welcome"
    // });
    console.log(process.env.APP_NAME);
};
// Export the controller functions
module.exports = {
    index
};
