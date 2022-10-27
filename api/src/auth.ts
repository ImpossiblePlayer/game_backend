import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

import { HTTP_STATUSES } from './index';

import UserModel from './models/users';

const SECRET = process.env.SECRET;
const TOKEN_LIFETIME = process.env.TOKEN_LIFETIME;

const register = async (req, res, validResult) => {
	try {
		// валидация запроса
		const errors = validResult;
		if (!errors.isEmpty()) {
			return res.status(HTTP_STATUSES.BAD_REQUEST_400);
			// .json(errors.array());
		}

		// хэширование пароля
		const password = req.body.password;
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);

		const doc = new UserModel({
			email: req.body.email,
			passwordHash: hash,
			nickname: req.body.nickname,
		});

		const user = await doc.save(); // сохраняем пользователя в БД

		// создаем токен, который работает <TOKEN_LIFETIME> по времени
		const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });

		const { passwordHash, ...userData } = user._doc;

		res.status(HTTP_STATUSES.CREATED_201).json({ ...userData, token });
	} catch (err) {
		console.log(err);
		res.status(HTTP_STATUSES.ITERNAL_ERROR_500).json('could not create user');
	}
};

export { register };
