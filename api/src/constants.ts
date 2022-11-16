require('dotenv').config();

const HTTP_STATUS_CODES = {
	OK_200: 200,
	CREATED_201: 201,
	NO_CONTENT_204: 204,
	BAD_REQUEST_400: 400,
	UNAUTHORIZED_401: 401,
	FORBIDDEN_403: 403,
	NOT_FOUND_404: 404,
	ITERNAL_ERROR_500: 500,
};

// используем порт, указанный в .env файле. иначе 3000
const PORT = process.env.PORT || 3000;

const DB_URI = process.env.DB_URI,
	DB_PROTOCOL = process.env.DB_PROTOCOL,
	DB_NAME = process.env.DB_NAME,
	DB_USERNAME = process.env.DB_USERNAME,
	DB_PASSWORD = process.env.DB_PASSWORD,
	DB_QUERY_STRING = process.env.DB_QUERY_STRING;

export {
	HTTP_STATUS_CODES,
	PORT,
	DB_USERNAME,
	DB_PASSWORD,
	DB_PROTOCOL,
	DB_URI,
	DB_NAME,
	DB_QUERY_STRING,
};
