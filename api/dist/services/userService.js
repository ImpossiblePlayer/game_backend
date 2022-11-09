"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid = __importStar(require("uuid"));
const models_1 = require("../models");
const tokenService_1 = __importDefault(require("./tokenService"));
class UserService {
    constructor() {
        this.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
        this.JWT_ACCESS_TOKEN_LIFETIME = process.env.JWT_ACCESS_TOKEN_LIFETIME;
        this.API_URL = process.env.API_URL;
        this.registration = (email, password, nickname) => __awaiter(this, void 0, void 0, function* () {
            const candidate = yield models_1.UserModel.findOne({ email });
            if (candidate) {
                throw new Error(`user with email ${email} already exists`);
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hash = yield bcrypt_1.default.hash(password, salt);
            const activationLink = uuid.v4();
            const doc = new models_1.UserModel({
                email,
                passwordHash: hash,
                nickname,
                activationLink,
            });
            const user = yield doc.save();
            const { accessToken, refreshToken } = tokenService_1.default.generateTokens({
                _id: user._id,
                email: user.email,
                isActivated: user.isActivated,
            });
            yield tokenService_1.default.saveToken(user._id, refreshToken);
            const _a = yield user._doc, { passwordHash } = _a, userData = __rest(_a, ["passwordHash"]);
            return Object.assign(Object.assign({}, userData), { accessToken, refreshToken });
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map