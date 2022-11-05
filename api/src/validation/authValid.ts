import { body } from 'express-validator';
import { UserModel } from '../models';

const regValidation = [
	body('email').isEmail(),
	body('password').isLength({ min: 8 }),
	body('nickname').isAlpha(),
];

const loginValidation = [
	body('email').isEmail(),
	body('password').isLength({ min: 8 }),
];

export { regValidation, loginValidation };
