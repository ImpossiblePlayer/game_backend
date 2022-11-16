import { UserModel } from '../models';

const register = async (req, res) => {
	const { email, password, nickname } = req.body;
	const candidate = await UserModel.find({ email });
};

export { register };
