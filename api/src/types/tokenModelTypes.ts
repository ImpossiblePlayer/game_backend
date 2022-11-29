import { UserModel } from '../models';

interface TokenResult<T> extends Document {
	_doc: T;
}

interface Token extends TokenResult<Token> {
	user: typeof UserModel;
	refreshToken: string;
}

export { Token };
