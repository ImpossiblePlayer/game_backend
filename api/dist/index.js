"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.HTTP_STATUSES = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const ws_1 = require("ws");
require('dotenv').config();
const authValid_1 = require("./validation/authValid");
const controllers_1 = require("./controllers");
const utils_1 = __importDefault(require("./utils"));
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
const server = http_1.default.createServer(exports.app);
const wss = new ws_1.WebSocket.Server({ server });
mongoose_1.default
    .connect(`${DB_URI}/${DBNAME}`)
    .then(() => {
    console.log('DB ok');
})
    .catch((err) => {
    console.log(`DB error: ${err}`);
});
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.post('/auth/register', authValid_1.regValidation, utils_1.default.handleValidationErrors, controllers_1.UserControllers.Register);
exports.app.post('/auth/login', authValid_1.loginValidation, utils_1.default.handleValidationErrors, controllers_1.UserControllers.Login);
exports.app.get('/auth/me', utils_1.default.checkAuth, controllers_1.UserControllers.GetMe);
exports.app.post('/profile/changenickname', utils_1.default.checkAuth, controllers_1.ProfileControllers.changeNickname);
exports.app.post('/profile/changepassword', utils_1.default.checkAuth, controllers_1.ProfileControllers.changePassword);
exports.app.post('/session/join/:id', utils_1.default.checkAuth, controllers_1.SessionControllers.JoinSession);
wss.on('connection', (ws) => {
    (0, controllers_1.WSController)(wss, ws, ws_1.WebSocket);
});
server.listen(port, () => {
    console.log(`listening on port ${port}`);
});
//# sourceMappingURL=index.js.map