import express from 'express';
import { MongoClient } from 'mongodb';

require('dotenv').config(); // получаем переменные из .env файла

const app = express();
const port = process.env.PORT ?? 3000; // используем порт, указанный в .env файле. иначе 3000

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

const DBUser = process.env.USER;
const DBPassword = process.env.PASSWORD;

const client = new MongoClient(
	`mongodb+srv://${DBUser}:${DBPassword}@cluster0.bciwiym.mongodb.net/?retryWrites=true&w=majority`
);

const start = async () => {
	try {
		// await client.connect();
		console.log('connected successfully');
	} catch (err) {
		console.log(err);
	}
};

app.listen(port, () => {
	console.log(`listening on port ${port}`);
	start();
});
