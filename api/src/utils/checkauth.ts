import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

require('dotenv').config(); // переменные из .env файла

import { HTTP_STATUSES } from '../index';

const SECRET = process.env.SECRET;

interface TypedReq extends Request {
	userId: string;
	headers: { authorization: string };
}

interface JwtPayload {
	_id: string;
}

const checkAuth = (req: TypedReq, res: Response, next: NextFunction) => {
	const token = req.headers.authorization; // вытаскиваем токен из кукис

	if (token) {
		try {
			// проверяем валидность токена
			const decoded = jwt.verify(token, SECRET) as JwtPayload;
			// и возвращаем id пользователя д
			req.userId = decoded._id;
			next();
		} catch (err) {
			console.log(err);
			res.status(HTTP_STATUSES.FORBIDDEN_403).json();
		}
	} else {
		res.status(HTTP_STATUSES.FORBIDDEN_403).json({ message: 'can not access' });
	}
};

export { checkAuth };
