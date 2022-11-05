import bcrypt from 'bcrypt';
import * as uuid from 'uuid';
import jwt from 'jsonwebtoken';

import { UserModel } from '../models';
import MailService from './mailService';

import { TypedService } from '../types';
import TokenService from './tokenService';

class UserService implements TypedService {
	JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
	JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
	JWT_ACCESS_TOKEN_LIFETIME = process.env.JWT_ACCESS_TOKEN_LIFETIME;
	API_URL = process.env.API_URL;

	registration = async (email, password, nickname) => {
		// проверяем наличие пользователя с таким email
		const candidate = await UserModel.findOne({ email });
		if (candidate) {
			throw new Error(`user with email ${email} already exists`);
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

		// await MailService.sendActivationEmail(
		// 	email,
		// 	`${this.API_URL}/auth/activate/activationLink`
		// );

		await TokenService.saveToken(user._id, refreshToken); // сохраняем обновляющий токен

		// отделяем хэш пароля от всего остального ...
		const { passwordHash, ...userData } = await user._doc;
		// ... и возвращаем вместе с токенами
		return { ...userData, accessToken, refreshToken };
	};
}

export default new UserService();
