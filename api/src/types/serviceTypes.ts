interface TypedService {
	JWT_ACCESS_SECRET: string;
	JWT_REFRESH_SECRET: string;
	JWT_ACCESS_TOKEN_LIFETIME: string;
	JWT_REFRESH_TOKEN_LIFETIME?: string;
	API_URL?: string;
}

export { TypedService };
