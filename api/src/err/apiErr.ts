import { HTTP_STATUS_CODES } from '../constants';

class ApiError extends Error {
	status: number;
	errors: string[];
	constructor(status: number, message: string, errors = []) {
		super(message);
		this.status = status;
		this.errors = errors;
	}

	static Unauthorized = () => {
		return new ApiError(HTTP_STATUS_CODES.UNAUTHORIZED_401, '');
	};

	static BadRequest = (message, errors = []) => {
		return new ApiError(HTTP_STATUS_CODES.BAD_REQUEST_400, message, errors);
	};
}

export { ApiError };
