const JWT = require("jsonwebtoken");
import { Request, Response } from "express";

const validateToken = async (req: Request, res: Response, next: any) => {
    let authHeader: any = req.headers.Authorization || req.headers.authorization;

    // if (authHeader && authHeader.startsWith('Bearer')) {
    //     token = authHeader.split(" ")[1];
    //     JWT.verify(token, process.env.TOKEN_SECRET, (err: any, decoded: any) => {
    //         if (err) {
    //             res.status(401).json({
    //                 "response_code": "401",
    //                 "response_message": "User is not authorised"
    //             });
    //         }
    //         console.log(decoded);
    //     })
    // }

    // Middleware to verify the JWT token
    // function verifyToken(req: Request, res: Response, next: any) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    JWT.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET, (err: any, decodedToken: any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        // Token is valid, store the decoded payload for later use
        // req.user = decodedToken;
        next();
    });
    // }
}
module.exports = validateToken;