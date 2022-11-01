import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';

require('dotenv').config(); // переменные из .env файла

// валидация
import { regValidation, loginValidation } from './validation/authValid';

// фунцкии эндпоинтов
import * as UserControllers from './controllers/auth';
import { checkAuth } from './utils/checkauth';

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

export const server = http.createServer(app);

// mongoose
// 	.connect(`${DB_URI}/${DBNAME}`)
// 	.then(() => {
// 		console.log('DB ok');
// 	})
// 	.catch((err) => {
// 		console.log('DB error: ' + err);
// 	});

app.use(express.json());
app.use(cors());

app.post('/auth/register', regValidation, UserControllers.Register);

app.post('/auth/login', loginValidation, UserControllers.Login);

app.get('/auth/me', checkAuth, UserControllers.GetMe);

server.listen(port, () => {
	console.log(`listening on port ${port}`);
});
