import express from 'express';

const app = express();
const port = process.env.port ?? 3300;

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
