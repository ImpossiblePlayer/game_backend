import { User } from '.';

// type TypedRegister = Omit<User, 'passwordHash'>;

interface TypedUserService {
	register: any;
	activate: any;
}

export { TypedUserService };
