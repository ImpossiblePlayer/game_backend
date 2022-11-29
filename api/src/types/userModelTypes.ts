interface UserResult<T> extends Document {
	_doc: T;
}

interface User extends UserResult<User> {
	nickname: string;
	email: string;
	passwordHash?: string;
	isActivated: boolean;
	activationLink: string;
}

export { User };
