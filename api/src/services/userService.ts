import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { UserModel } from '../models';
import MailService from './mailService';
import TokenService from './tokenService';
import { ApiError } from '../err';

import { TypedUserService } from '../types';
import {
	JWT_ACCESS_SECRET,
	JWT_ACCESS_TOKEN_LIFETIME,
	JWT_REFRESH_SECRET,
	API_URL,
} from '../constants';

class UserService implements TypedUserService {
	// private _JWT_ACCESS_SECRET: string = JWT_ACCESS_SECRET;
	// private _JWT_REFRESH_SECRET: string = JWT_REFRESH_SECRET;
	// private _JWT_ACCESS_TOKEN_LIFETIME: string = JWT_ACCESS_TOKEN_LIFETIME;
	private _API_URL: string = API_URL;

	register = async (email, password, nickname) => {
		// проверяем наличие пользователя с таким email
		const candidate = await UserModel.findOne({ email });
		if (candidate) {
			throw ApiError.BadRequest(`user with email ${email} already exists`);
		}

		// хэширование пароля
		const salt = await bcrypt.genSalt(10);
		const hash: string = await bcrypt.hash(password, salt);

		const activationLink = uuid.v4(); // создаем уникальную строку

		// создаем нового пользователя
		const doc = new UserModel({
			email,
			passwordHash: hash,
			nickname,
			activationLink,
		});
		const user = await doc.save(); // сохраняем пользователя в БД

		// создаем токены, которые работают <JWT_#_TOKEN_LIFETIME> по времени
		const { accessToken, refreshToken } = TokenService.generateTokens({
			_id: user._id,
			email: user.email,
			isActivated: user.isActivated,
		});

		await MailService.sendActivationEmail(
			email,
			`${this._API_URL}/auth/activate/activationLink`
		);

		await TokenService.saveToken(user._id, refreshToken); // сохраняем обновляющий токен

		// отделяем хэш пароля от всего остального ...
		const { passwordHash, ...userData } = await user._doc;
		// ... и возвращаем вместе с токенами
		return { ...userData, accessToken, refreshToken };
	};

	activate = async (activationLink) => {
		const candidate = await UserModel.findOne({ activationLink });
		if (!candidate) {
			// throw ApiError.BadRequest('incorrect activation link');
		}
		candidate.isActivated = true;
		await candidate.save();
	};
}

export default new UserService();
