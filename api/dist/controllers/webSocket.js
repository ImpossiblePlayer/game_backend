"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSController = void 0;
const WSController = (wss, ws, WS) => {
    console.log('new client connected');
    ws.send('successful connection');
    ws.on('message', (data) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WS.OPEN) {
                client.send(data);
            }
        });
    });
};
exports.WSController = WSController;
//# sourceMappingURL=webSocket.js.map