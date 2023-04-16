import { HTTP_STATUSES } from '../index';

class ApiError extends Error {
	status;
	errors;
	constructor(status, message, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static Unauthorized = () => {
		return new ApiError(HTTP_STATUSES.UNAUTHORIZED_401, '');
	};

	static BadRequest = (message, errors = []) => {
		return new ApiError(HTTP_STATUSES.BAD_REQUEST_400, message, errors);
	};
}

export { ApiError };
