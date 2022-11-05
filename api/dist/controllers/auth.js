"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMe = exports.Login = exports.Register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
require('dotenv').config();
const index_1 = require("../index");
const models_1 = require("../models");
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_ACCESS_TOKEN_LIFETIME = process.env.JWT_ACCESS_TOKEN_LIFETIME;
const Register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(password, salt);
        const doc = new models_1.UserModel({
            email: req.body.email,
            passwordHash: hash,
            nickname: req.body.nickname,
        });
        const user = await doc.save();
        const token = await jsonwebtoken_1.default.sign({ _id: user._id }, JWT_ACCESS_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
        });
        const { passwordHash, ...userData } = await user._doc;
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
        const user = await models_1.UserModel.findOne({ email: req.body.email });
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
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, JWT_ACCESS_SECRET, {
            expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
        });
        const { passwordHash, ...userData } = user._doc;
        res.status(index_1.HTTP_STATUSES.OK_200).json({ ...userData, token });
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
        const user = await models_1.UserModel.findById(req.userId);
        if (!user) {
            return res
                .status(index_1.HTTP_STATUSES.NOT_FOUND_404)
                .json({ message: 'user not found' });
        }
        const { passwordHash, ...userData } = await user._doc;
        res.status(index_1.HTTP_STATUSES.OK_200).json(userData);
    }
    catch (err) {
        console.log(err);
        res.status(index_1.HTTP_STATUSES.ITERNAL_ERROR_500);
    }
};
exports.GetMe = GetMe;
//# sourceMappingURL=auth.js.map