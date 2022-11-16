import { body } from 'express-validator';

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
