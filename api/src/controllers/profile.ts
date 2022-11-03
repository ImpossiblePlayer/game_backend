import { Response } from 'express';
import { TypedChangeNicknameReq, TypedChangePasswordReq } from '../types';
import { HTTP_STATUSES } from '../index';
import { UserModel } from '../models';

import bcrypt from 'bcrypt';

const changeNickname = async (req: TypedChangeNicknameReq, res: Response) => {
	try {
		const newNickname: string = req.body.nickname;
		if (newNickname) {
			await UserModel.findOneAndUpdate(
				{ id: req.userId },
				{ nickname: newNickname }
			);
		} else {
			res
				.status(HTTP_STATUSES.BAD_REQUEST_400)
				.json({ message: 'invalid request' });
		}
	} catch (err) {
		console.log(err);
		res.status(HTTP_STATUSES.ITERNAL_ERROR_500);
	}
};

const changePassword = async (req: TypedChangePasswordReq, res: Response) => {
	try {
		const user = await UserModel.findById(req.userId);
		const password: string = req.body.password;
		const isValidPassword: boolean = await bcrypt.compare(
			password,
			user._doc.passwordHash
		);

		const newPassword: string = req.body.newPassword;
		const salt = await bcrypt.genSalt(10);
		const hash: string = await bcrypt.hash(password, salt);
		if (isValidPassword) {
			await UserModel.findOneAndUpdate(
				{ id: req.userId },
				{ passwordHash: hash }
			);
		} else {
			res
				.status(HTTP_STATUSES.BAD_REQUEST_400)
				.json({ message: 'invalid request' });
		}
	} catch (err) {
		console.log(err);
		res.status(HTTP_STATUSES.ITERNAL_ERROR_500);
	}
};

export { changeNickname, changePassword };
