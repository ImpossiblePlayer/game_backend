"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const index_1 = require("./index");
const wss = new ws_1.default.Server({ server: index_1.server });
//# sourceMappingURL=webSocket.js.map