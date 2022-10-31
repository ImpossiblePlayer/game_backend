import jwt from 'jsonwebtoken';

require('dotenv').config(); // переменные из .env файла

import { HTTP_STATUSES } from './../index';

const SECRET = process.env.SECRET;

interface JwtPayload {
	_id: string;
}

const checkAuth = (req, res, next) => {
	const token = req.headers.authorization;

	if (token) {
		try {
			const decoded = jwt.verify(token, SECRET) as JwtPayload;
			req.userId = decoded._id;
			next();
		} catch (err) {
			console.log(err);
		}
	} else {
		res
			.status(HTTP_STATUSES.FORBIDDEN_403)
			.json({ message: 'no access token' });
	}
};

export { checkAuth };
