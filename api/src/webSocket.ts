import WebSocket from 'ws';
import { server } from './index';

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
	console.log('new client connected');
	ws.send('successful connection');
	ws.on('message', (msg) => {
		wss.clients.forEach((client) => {
			if (client !== ws && client.readyState === WebSocket.OPEN)
				client.send('');
		});
	});
});
