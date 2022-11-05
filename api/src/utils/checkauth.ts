import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { HTTP_STATUSES } from '../index';

const SECRET = process.env.SECRET;

interface TypedReq extends Request {
	userId: string;
	headers: { authorization: string };
}

const checkAuth = (req: TypedReq, res: Response, next: NextFunction) => {
	const token: string = req.headers.authorization; // вытаскиваем токен из кукис

	if (token) {
		try {
			// проверяем валидность токена
			const decoded: JwtPayload = jwt.verify(token, SECRET) as JwtPayload;
			// и возвращаем id пользователя д
			req.userId = decoded._id;
			return next();
		} catch (err) {
			console.log(err);
			return res.status(HTTP_STATUSES.FORBIDDEN_403).json();
		}
	}

	res.status(HTTP_STATUSES.FORBIDDEN_403).json({ message: 'can not access' });
};

export { checkAuth };
