"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokenMiddleware = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
// normalizeEmail
if (process.env.NODE_ENV !== "production") {
    var result = dotenv_1.default.config();
    if (result.error) {
        throw result.error;
    }
}
var checkTokenMiddleware = function (req, res, next) {
    var token = String(req.headers["x-access-token"] || req.headers["authorization"]);
    if (!token)
        return res
            .status(401)
            .json({ message: "Access denied. No token provided." });
    try {
        var secret = process.env.JWT_SECRET;
        req.body.user = jsonwebtoken_1.default.verify(token, secret);
        next();
    }
    catch (ex) {
        res.status(400).json({ message: "Invalid token." });
    }
};
exports.checkTokenMiddleware = checkTokenMiddleware;
