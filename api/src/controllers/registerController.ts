import { HTTP_STATUS_CODES } from '../constants';
import UserService from '../services/userService';

const Register = async (req, res) => {
	try {
		const { email, password, nickname } = req.body;

		UserService.register(email, password, nickname);

		const userData = await UserService.register(email, password, nickname);
		res.cookie('refreshToken', userData.refreshToken, {
			maxAge: 30 * 24 * 60 * 60 * 1000,
			httpOnly: true,
		});
		return res.status(HTTP_STATUS_CODES.CREATED_201).json(userData);
	} catch (err) {
		console.log(err);
		return res
			.status(HTTP_STATUS_CODES.ITERNAL_ERROR_500)
			.json('could not register');
	}
};

export default Register;
