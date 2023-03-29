import bcrypt from 'bcrypt';
import * as uuid from 'uuid';

import { UserModel } from '../models';
import MailService from './mailService';
import TokenService from './tokenService';
import { ApiError } from '../errors';

import { TypedUserService } from '../types';
import { API_URL } from '../constants';
import { UserDto } from '../dtos';

class UserService implements TypedUserService {
	private _API_URL: string = API_URL;

	register = async (email: string, password: string, nickname: string) => {
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

		const userDto = new UserDto(user);
		const { accessToken, refreshToken } = TokenService.generateTokens({
			...userDto,
		});

		await MailService.sendActivationEmail(
			email,
			`${this._API_URL}/auth/activate/activationLink`
		);

		await TokenService.saveToken(user._id, refreshToken); // сохраняем обновляющий токен

		const result = { accessToken, refreshToken, user: userDto };
		// ... возвращаем данные пользователя вместе с токенами
		return result;
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
