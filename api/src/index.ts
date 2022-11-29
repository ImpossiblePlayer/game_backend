import http from 'http';
import express from 'express';
import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { Server as socketio } from 'socket.io';
import mongoose from 'mongoose';

// валидация
import { regValidation, loginValidation } from './validation/authValid';

require('dotenv').config(); // переменные из .env файла

// фунцкии эндпоинтов и webSocket
import {
	ProfileControllers,
	SessionControllers,
	UserControllers,
} from './controllers';

import Utils from './utils';
import { ErrorMiddleware } from './middleware';

// константы базы данных
const DB_URI = process.env.DB_URI,
	DB_PROTOCOL = process.env.DB_PROTOCOL,
	DB_NAME = process.env.DB_NAME,
	DB_USERNAME = process.env.DB_USERNAME,
	DB_PASSWORD = process.env.DB_PASSWORD,
	DB_QUERY_STRING = process.env.DB_QUERY_STRING;

export const HTTP_STATUSES = {
	OK_200: 200,
	CREATED_201: 201,
	NO_CONTENT_204: 204,
	BAD_REQUEST_400: 400,
	UNAUTHORIZED_401: 401,
	FORBIDDEN_403: 403,
	NOT_FOUND_404: 404,
	ITERNAL_ERROR_500: 500,
};

// используем порт, указанный в .env файле. иначе 3000
const port = process.env.PORT || 3000;

export const app = express();
export const server = http.createServer(app);
// export const io = new socketio(server, {
// 	transports: ['websocket'],
// });

app.use(express.json());
app.use(cors());
// app.use(cookieParser());
app.use(ErrorMiddleware);

app.post(
	'/auth/register',
	regValidation,
	Utils.handleValidationErrors,
	UserControllers.Register
);
app.get('/auth/activate/:link');
app.post(
	'/auth/login',
	loginValidation,
	Utils.handleValidationErrors,
	UserControllers.Login
);
app.post('/auth/logout', Utils.checkAuth, UserControllers.Logout);
app.get('/auth/refresh');
app.get('/auth/me', Utils.checkAuth, UserControllers.GetMe);

app.post(
	'/profile/changenickname',
	Utils.checkAuth,
	ProfileControllers.changeNickname
);

app.post(
	'/profile/changepassword',
	Utils.checkAuth,
	ProfileControllers.changePassword
);

app.post('/session/join/:id', Utils.checkAuth, SessionControllers.JoinSession);

// обработка нового подключения
// io.on('connection', (socket) => {
// 	console.log('new client connected');
// 	socket.emit('message', 'successful connection');

// 	// отправляет сообщение всем, кроме нового пользователя
// 	socket.broadcast.emit('message', 'new user connected');

// 	socket.on('disconnect', () => {
// 		io.emit('message', 'user has disconnected');
// 	});

// 	socket.on('chatMessage', (msg) => {
// 		console.log(msg);
// 	});
// });

(async () => {
	try {
		await mongoose
			.connect(
				`${DB_PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_URI}/${DB_NAME}?${DB_QUERY_STRING}`
			)
			.then(() => {
				console.log('DB ok');
			})
			.catch((err) => {
				console.log(`DB error: ${err}`);
			});
	} catch (err) {
		console.log(err);
	}
})();

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
console.log(
	`${DB_PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_URI}/${DB_NAME}?${DB_QUERY_STRING}`
);
