"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT ?? 3000;
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const DBUser = process.env.USER;
const DBPassword = process.env.PASSWORD;
const client = new mongodb_1.MongoClient(`mongodb+srv://${DBUser}:${DBPassword}@cluster0.bciwiym.mongodb.net/?retryWrites=true&w=majority`);
const start = async () => {
    try {
        await client.connect();
        console.log('connected successfully');
    }
    catch (err) {
        console.log(err);
    }
};
app.listen(port, () => {
    console.log(`listening on port ${port}`);
    start();
});
//# sourceMappingURL=index.js.map