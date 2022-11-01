"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
const index_1 = require("./index");
const wss = new ws_1.default.Server({ server: index_1.server });
wss.on('connection', (ws) => {
    console.log('new client connected');
    ws.send('successful connection');
    ws.on('message', (msg) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === ws_1.default.OPEN)
                client.send('');
        });
    });
});
//# sourceMappingURL=webSocket.js.map