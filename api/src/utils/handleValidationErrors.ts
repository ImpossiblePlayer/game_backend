import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { HTTP_STATUSES } from '../index';

const handleValidationErrors = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// если валидация запроса возвращает ошибки, возвращаем 400
	if (!validationResult(req).isEmpty()) {
		return res.status(HTTP_STATUSES.BAD_REQUEST_400);
	}

	next();
};

export { handleValidationErrors };
