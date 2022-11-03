import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { WebSocket } from 'ws';

require('dotenv').config(); // переменные из .env файла

// валидация
import { regValidation, loginValidation } from './validation/authValid';

// фунцкии эндпоинтов и webSocket
import {
	ProfileControllers,
	SessionControllers,
	UserControllers,
	WSController,
} from './controllers';

import Utils from './utils';

// константы базы данных
// const DBUSERNAME = process.env.DBUSERNAME;
// const DBPASSWORD = process.env.DBPASSWORD;
const DB_URI = process.env.DB_URI;
const DBNAME = process.env.DBNAME;

export const HTTP_STATUSES = {
	OK_200: 200,
	CREATED_201: 201,
	NO_CONTENT_204: 204,
	BAD_REQUEST_400: 400,
	FORBIDDEN_403: 403,
	NOT_FOUND_404: 404,
	ITERNAL_ERROR_500: 500,
};

// используем порт, указанный в .env файле. иначе 3000
const port = process.env.PORT ?? 3000;

export const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

mongoose
	.connect(`${DB_URI}/${DBNAME}`)
	.then(() => {
		console.log('DB ok');
	})
	.catch((err) => {
		console.log('DB error: ' + err);
	});

app.use(express.json());
app.use(cors());

app.post(
	'/auth/register',
	regValidation,
	Utils.handleValidationErrors,
	UserControllers.Register
);
app.post(
	'/auth/login',
	loginValidation,
	Utils.handleValidationErrors,
	UserControllers.Login
);
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

wss.on('connection', (ws) => {
	WSController(wss, ws, WebSocket);
});

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
