"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMe = exports.Login = exports.Register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
require('dotenv').config();
const index_1 = require("../index");
const users_1 = __importDefault(require("../models/users"));
const SECRET = process.env.SECRET;
const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME;
const Register = async (req, res) => {
    try {
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            return res.status(index_1.HTTP_STATUSES.BAD_REQUEST_400);
        }
        const password = req.body.password;
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(password, salt);
        const doc = new users_1.default({
            email: req.body.email,
            passwordHash: hash,
            nickname: req.body.nickname,
        });
        const user = await doc.save();
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, SECRET, {
            expiresIn: TOKEN_LIFETIME,
        });
        const { passwordHash, ...userData } = user._doc;
        res.status(index_1.HTTP_STATUSES.CREATED_201).json({ ...userData, token });
    }
    catch (err) {
        console.log(err);
        res
            .status(index_1.HTTP_STATUSES.ITERNAL_ERROR_500)
            .json({ message: 'could not create user' });
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
            return res.status(index_1.HTTP_STATUSES.BAD_REQUEST_400);
        }
        const user = await users_1.default.findOne({ email: req.body.email });
        if (!user) {
            return res
                .status(index_1.HTTP_STATUSES.NOT_FOUND_404)
                .json({ message: 'could not authorize' });
        }
        const isValidPassword = await bcrypt_1.default.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPassword) {
            return res
                .status(index_1.HTTP_STATUSES.NOT_FOUND_404)
                .json('invalid login or password');
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, SECRET, {
            expiresIn: TOKEN_LIFETIME,
        });
        const { passwordHash, ...userData } = user._doc;
        res.status(index_1.HTTP_STATUSES.OK_200).json({ ...userData, token });
        res.status();
    }
    catch (err) {
        console.log(err);
        res
            .status(index_1.HTTP_STATUSES.ITERNAL_ERROR_500)
            .json({ message: 'could not authorize' });
    }
};
exports.Login = Login;
const GetMe = async (req, res) => {
    try {
        const user = await users_1.default.findById(req.userId);
        if (!user) {
            return res
                .status(index_1.HTTP_STATUSES.NOT_FOUND_404)
                .json({ message: 'user not found' });
        }
        const { passwordHash, ...userData } = user._doc;
        res.status(index_1.HTTP_STATUSES.OK_200).json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(index_1.HTTP_STATUSES.ITERNAL_ERROR_500);
    }
};
exports.GetMe = GetMe;
//# sourceMappingURL=auth.js.map