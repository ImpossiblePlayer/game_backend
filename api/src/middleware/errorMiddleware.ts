import { HTTP_STATUSES } from '../index';
import { ApiError } from '../err/apiError';

const ErrorMiddleware = (err, req, res, next) => {
	console.log(err);
	if (err instanceof ApiError) {
		return res
			.status(err.status)
			.json({ message: err.message, errors: err.errors });
	}
	return res
		.status(HTTP_STATUSES.ITERNAL_ERROR_500)
		.json({ message: 'internal error', errors: err.errors });
};

export { ErrorMiddleware };
