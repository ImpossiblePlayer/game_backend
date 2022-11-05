"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.changeNickname = void 0;
const index_1 = require("../index");
const models_1 = require("../models");
const bcrypt_1 = __importDefault(require("bcrypt"));
const changeNickname = async (req, res) => {
    try {
        const newNickname = req.body.nickname;
        if (newNickname) {
            await models_1.UserModel.findOneAndUpdate({ id: req.userId }, { nickname: newNickname });
            return res
                .status(index_1.HTTP_STATUSES.OK_200)
                .json({ message: 'updated successfully' });
        }
        res
            .status(index_1.HTTP_STATUSES.BAD_REQUEST_400)
            .json({ message: 'invalid request' });
    }
    catch (err) {
        console.log(err);
        res.status(index_1.HTTP_STATUSES.ITERNAL_ERROR_500);
    }
};
exports.changeNickname = changeNickname;
const changePassword = async (req, res) => {
    try {
        const user = await models_1.UserModel.findById(req.userId);
        const password = req.body.password;
        const isValidPassword = await bcrypt_1.default.compare(password, user._doc.passwordHash);
        const newPassword = req.body.newPassword;
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(password, salt);
        if (isValidPassword) {
            await models_1.UserModel.findOneAndUpdate({ id: req.userId }, { passwordHash: hash });
        }
        else {
            res
                .status(index_1.HTTP_STATUSES.BAD_REQUEST_400)
                .json({ message: 'invalid request' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(index_1.HTTP_STATUSES.ITERNAL_ERROR_500);
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=profile.js.map