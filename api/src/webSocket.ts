// import { io } from './index';

// // обработка нового подключения
// io.on('connection', (socket) => {
// 	console.log('new client connected');
// 	socket.emit('message', 'successful connection');

// 	// отправляет сообщение всем, кроме нового пользователя
// 	socket.broadcast.emit('message', 'new user connected');

// 	socket.on('disconnect', () => {
// 		io.emit('message', 'user has disconnected');
// 	});
// });
