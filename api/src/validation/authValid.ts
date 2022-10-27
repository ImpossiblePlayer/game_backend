import { body } from 'express-validator';

export const regValidation = [
	body('email').isEmail(),
	body('password').isLength({ min: 8 }),
	body('nickname').isAlpha(),
];
