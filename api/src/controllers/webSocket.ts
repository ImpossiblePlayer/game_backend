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

export { WSController };
