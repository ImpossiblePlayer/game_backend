import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieparsers from 'cookie-parser';

import { HTTP_STATUSES } from '../index';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const JWT_ACCESS_TOKEN_LIFETIME = process.env.JWT_ACCESS_TOKEN_LIFETIME;

import { UserModel } from '../models';

import {
	TypedGetMeBodyReq,
	TypedLoginBodyReq,
	TypedRegisterBodyReq,
	TypedLogoutBodyReq,
} from '../types';
import { UserService } from '../services/';

// константы для JWT

const Register = async (req: TypedRegisterBodyReq, res: Response) => {
	try {
		const userData = await UserService.registration(
			req.body.email,
			req.body.password,
			req.body.nickname
		);
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return res.json(userData);
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

const Logout = async (req: TypedLogoutBodyReq, res: Response) => {};

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

export { Register, Login, Logout, GetMe };
