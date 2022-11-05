import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

require('dotenv').config(); // переменные из .env файла
import { HTTP_STATUSES } from '../index';

import { UserModel } from '../models';

import {
	TypedGetMeBodyReq,
	TypedLoginBodyReq,
	TypedRegisterBodyReq,
} from '../types';

// константы для JWT
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_ACCESS_TOKEN_LIFETIME = process.env.JWT_ACCESS_TOKEN_LIFETIME;

const Register = async (req: TypedRegisterBodyReq, res: Response<{}>) => {
	try {
		// хэширование пароля
		const password: string = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash: string = await bcrypt.hash(password, salt);

		// создаем нового пользователя
		const doc = new UserModel({
			email: req.body.email,
			passwordHash: hash,
			nickname: req.body.nickname,
		});

		const user = await doc.save(); // сохраняем пользователя в БД

		// создаем токен, который работает <JWT_ACCESS_TOKEN_LIFETIME> по времени
		const token: string = await jwt.sign({ _id: user._id }, JWT_ACCESS_SECRET, {
			expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
		});

		// отделяем хэш пароля от всего остального ...
		const { passwordHash, ...userData } = await user._doc;
		// ... и возвращаем вместе с токеном
		res.status(HTTP_STATUSES.CREATED_201).json({ ...userData, token });
	} catch (err) {
		console.log(err);
		res
			.status(HTTP_STATUSES.ITERNAL_ERROR_500)
			.json({ message: 'could not create user' });
	}
};

const Login = async (req: TypedLoginBodyReq, res: Response) => {
	try {
		const user = await UserModel.findOne({ email: req.body.email });
		// если пользователь не существует, возвращаем 404
		if (!user) {
			return res
				.status(HTTP_STATUSES.NOT_FOUND_404)
				.json({ message: 'could not authorize' });
		}

		// если пользователь существует, сравниваем хэш введенного пароля с хэшем из БД
		const isValidPassword: boolean = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		);

		// если хэши не совпадают, возвращаем 4-4
		if (!isValidPassword) {
			return res
				.status(HTTP_STATUSES.NOT_FOUND_404)
				.json('invalid login or password');
		}

		const token: string = jwt.sign({ _id: user._id }, JWT_ACCESS_SECRET, {
			expiresIn: JWT_ACCESS_TOKEN_LIFETIME,
		});

		// отделяем хэш пароля от всего остального ...
		const { passwordHash, ...userData } = user._doc;
		// ... и возвращаем вместе с токеном
		res.status(HTTP_STATUSES.OK_200).json({ ...userData, token });
	} catch (err) {
		console.log(err);
		res
			.status(HTTP_STATUSES.ITERNAL_ERROR_500)
			.json({ message: 'could not authorize' });
	}
};

const GetMe = async (req: TypedGetMeBodyReq, res: Response) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			return res
				.status(HTTP_STATUSES.NOT_FOUND_404)
				.json({ message: 'user not found' });
		}
		// отделяем хэш пароля от всего остального ...
		const { passwordHash, ...userData } = await user._doc;
		// ... и возвращаем вместе с токеном
		res.status(HTTP_STATUSES.OK_200).json(userData);
	} catch (err) {
		console.log(err);
		res.status(HTTP_STATUSES.ITERNAL_ERROR_500);
	}
};

export { Register, Login, GetMe };
