import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

require('dotenv').config(); // переменные из .env файла

import { HTTP_STATUSES } from '../index';

import UserModel from '../models/users';

// константы для JWT
const SECRET = process.env.SECRET;
const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME;

const Register = async (req, res) => {
	try {
		// если валидация запроса возвращает ошибки, возвращаем 404
		if (!validationResult(req).isEmpty()) {
			return res.status(HTTP_STATUSES.BAD_REQUEST_400);
		}

		// хэширование пароля
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		// создаем нового пользователя
		const doc = new UserModel({
			email: req.body.email,
			passwordHash: hash,
			nickname: req.body.nickname,
		});

		const user = await doc.save(); // сохраняем пользователя в БД

		// создаем токен, который работает <TOKEN_LIFETIME> по времени
		const token = jwt.sign({ _id: user._id }, SECRET, {
			expiresIn: TOKEN_LIFETIME,
		});

		// отделяем хэш пароля от всего остального ...
		const { passwordHash, ...userData } = user._doc;
		// ... и возвращаем вместе с токеном
		res.status(HTTP_STATUSES.CREATED_201).json({ ...userData, token });
	} catch (err) {
		console.log(err);
		res
			.status(HTTP_STATUSES.ITERNAL_ERROR_500)
			.json({ message: 'could not create user' });
	}
};

const Login = async (req, res) => {
	try {
		// если валидация запроса возвращает ошибки, возвращаем 404
		if (!validationResult(req).isEmpty()) {
			return res.status(HTTP_STATUSES.BAD_REQUEST_400);
		}
		const user = await UserModel.findOne({ email: req.body.email });
		// если пользователь не существует, возвращаем 404
		if (!user) {
			return res
				.status(HTTP_STATUSES.NOT_FOUND_404)
				.json({ message: 'could not authorize' });
		}

		// если пользователь существует, сравниваем хэш введенного пароля с хэшем из БД
		const isValidPassword = await bcrypt.compare(
			req.body.password,
			user._doc.passwordHash
		);

		// если хэши не совпадают, возвращаем 4-4
		if (!isValidPassword) {
			return res
				.status(HTTP_STATUSES.NOT_FOUND_404)
				.json('invalid login or password');
		}

		const token = jwt.sign({ _id: user._id }, SECRET, {
			expiresIn: TOKEN_LIFETIME,
		});

		// отделяем хэш пароля от всего остального ...
		const { passwordHash, ...userData } = user._doc;
		// ... и возвращаем вместе с токеном
		res.status(HTTP_STATUSES.OK_200).json({ ...userData, token });

		res.status();
	} catch (err) {
		console.log(err);
		res
			.status(HTTP_STATUSES.ITERNAL_ERROR_500)
			.json({ message: 'could not authorize' });
	}
};

const GetMe = async (req, res) => {
	try {
		const user = await UserModel.findById(req.userId);

		if (!user) {
			return res
				.status(HTTP_STATUSES.NOT_FOUND_404)
				.json({ message: 'user not found' });
		}
		// отделяем хэш пароля от всего остального ...
		const { passwordHash, ...userData } = user._doc;
		// ... и возвращаем вместе с токеном
		res.status(HTTP_STATUSES.OK_200).json(userData);
	} catch (err) {
		console.log(err);
		res.status(HTTP_STATUSES.ITERNAL_ERROR_500);
	}
};

export { Register, Login, GetMe };
