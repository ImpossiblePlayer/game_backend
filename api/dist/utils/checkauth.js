"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const index_1 = require("./../index");
const SECRET = process.env.SECRET;
const checkAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, SECRET);
            req.userId = decoded._id;
            next();
        }
        catch (err) {
            console.log(err);
        }
    }
    else {
        res
            .status(index_1.HTTP_STATUSES.FORBIDDEN_403)
            .json({ message: 'no access token' });
    }
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkauth.js.map