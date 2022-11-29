import jwt, { JwtPayload } from 'jsonwebtoken';
import { TokenModel } from '../models';
import { TypedTokenService } from '../types';

class TokenService implements TypedTokenService {
	JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
	JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
	JWT_ACCESS_TOKEN_LIFETIME = process.env.JWT_ACCESS_TOKEN_LIFETIME;
	JWT_REFRESH_TOKEN_LIFETIME = process.env.JWT_REFRESH_TOKEN_LIFETIME;

	generateTokens = (payload: JwtPayload) => {
		const accessToken = jwt.sign(payload, this.JWT_ACCESS_SECRET, {
			expiresIn: this.JWT_ACCESS_TOKEN_LIFETIME,
		});
		const refreshToken = jwt.sign(payload, this.JWT_REFRESH_SECRET, {
			expiresIn: this.JWT_REFRESH_TOKEN_LIFETIME,
		});

		return { accessToken, refreshToken };
	};

	saveToken = async (userId, refreshToken) => {
		const tokenData = await TokenModel.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return await tokenData.save();
		}
		const token = await TokenModel.findOne({ user: userId, refreshToken });
		return token;
	};
}

export default new TokenService();
