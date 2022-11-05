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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
class TokenService {
    constructor() {
        this.JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        this.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
        this.JWT_ACCESS_TOKEN_LIFETIME = process.env.JWT_ACCESS_TOKEN_LIFETIME;
        this.JWT_REFRESH_TOKEN_LIFETIME = process.env.JWT_REFRESH_TOKEN_LIFETIME;
        this.generateTokens = (payload) => {
            const accessToken = jsonwebtoken_1.default.sign(payload, this.JWT_ACCESS_SECRET, {
                expiresIn: this.JWT_ACCESS_TOKEN_LIFETIME,
            });
            const refreshToken = jsonwebtoken_1.default.sign(payload, this.JWT_REFRESH_SECRET, {
                expiresIn: this.JWT_REFRESH_TOKEN_LIFETIME,
            });
            return { accessToken, refreshToken };
        };
        this.saveToken = (userId, refreshToken) => __awaiter(this, void 0, void 0, function* () {
            const tokenData = yield models_1.TokenModel.findOne({ user: userId });
            if (tokenData) {
                tokenData.refreshToken = refreshToken;
                return yield tokenData.save();
            }
            const token = yield models_1.TokenModel.findOne({ user: userId, refreshToken });
            return token;
        });
    }
}
exports.default = new TokenService();
//# sourceMappingURL=tokenService.js.map