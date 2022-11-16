import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';

import { AuthRouter } from './routers';

import {
	// DB_NAME,
	DB_PASSWORD,
	DB_PROTOCOL,
	DB_QUERY_STRING,
	DB_URI,
	DB_USERNAME,
	PORT,
} from './constants';

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

app.use('/auth', AuthRouter);

server.listen(PORT, () => console.log(`server listening on port ${PORT}`));

(async () => {
	try {
		await mongoose
			.connect(
				`${DB_PROTOCOL}://${DB_USERNAME}:${DB_PASSWORD}@${DB_URI}?${DB_QUERY_STRING}`
			)
			.then(() => {
				console.log('DB ok');
			})
			.catch((err) => {
				console.log(`DB error: ${err}`);
			});
	} catch (err) {}
})();
