const JWT = require("jsonwebtoken");
import { Request, Response } from "express";

// Middleware to verify the JWT token
const validateToken = async (req: Request, res: Response, next: any) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            "response_code": "401",
            "response_message": "No token provided.",
        });
    }

    JWT.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET, (err: any, decodedToken: any) => {
        if (err) {
            return res.status(401).json({
                "response_code": "401",
                "response_message": "Invalid token.",
            });
        }

        // Token is valid, store the decoded payload for later use
        // req.user = decodedToken;
        next();
    });
}
module.exports = validateToken;