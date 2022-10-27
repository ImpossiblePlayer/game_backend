import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

require('dotenv').config(); // переменные из .env файла

// валидация
import { regValidation } from './validation/authValid';
import { register } from './auth';
import { validationResult } from 'express-validator';

// константы базы данных
// const DBUSERNAME = process.env.DBUSERNAME;
// const DBPASSWORD = process.env.DBPASSWORD;
const DBPORT = process.env.DBPORT;
const DBNAME = process.env.DBNAME;

export const HTTP_STATUSES = {
	OK_200: 200,
	CREATED_201: 201,
	NO_CONTENT_204: 204,
	BAD_REQUEST_400: 400,
	NOT_FOUND_404: 404,
	ITERNAL_ERROR_500: 500,
};

// используем порт, указанный в .env файле. иначе 3000
const port = process.env.PORT ?? 3000;

export const app = express();

mongoose
	.connect(`mongodb://mongo:${DBPORT}/${DBNAME}`)
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
	async (req: express.Request, res: express.Response) => {
		await register(req, res, validationResult(req));
	}
);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
