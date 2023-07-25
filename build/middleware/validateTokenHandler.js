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
const JWT = require("jsonwebtoken");
// Middleware to verify the JWT token
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            "response_code": "401",
            "response_message": "No token provided.",
        });
    }
    JWT.verify(token.replace('Bearer ', ''), process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({
                "response_code": "401",
                "response_message": "Invalid token.",
            });
        }
        // Token is valid, store the decoded payload for later use
        req.user = decodedToken;
        next();
    });
});
module.exports = validateToken;
