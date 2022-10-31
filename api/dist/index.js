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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = exports.HTTP_STATUSES = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
require('dotenv').config();
const authValid_1 = require("./validation/authValid");
const UserControllers = __importStar(require("./controllers/auth"));
const checkauth_1 = require("./utils/checkauth");
const DB_URI = process.env.DB_URI;
const DBNAME = process.env.DBNAME;
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    FORBIDDEN_403: 403,
    NOT_FOUND_404: 404,
    ITERNAL_ERROR_500: 500,
};
const port = process.env.PORT ?? 3000;
exports.app = (0, express_1.default)();
exports.server = http_1.default.createServer(exports.app);
mongoose_1.default
    .connect(`${DB_URI}/${DBNAME}`)
    .then(() => {
    console.log('DB ok');
})
    .catch((err) => {
    console.log('DB error: ' + err);
});
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.post('/auth/register', authValid_1.regValidation, UserControllers.Register);
exports.app.post('/auth/login', authValid_1.loginValidation, UserControllers.Login);
exports.app.get('/auth/me', checkauth_1.checkAuth, UserControllers.GetMe);
exports.server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
//# sourceMappingURL=index.js.map