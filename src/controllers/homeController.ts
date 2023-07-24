import { Request, Response } from "express";

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

// Export the controller functions
module.exports = {
	index
};
