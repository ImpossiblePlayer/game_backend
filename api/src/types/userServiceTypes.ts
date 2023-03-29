import { UserDto } from '../dtos';

interface TypedRegister {
	(email: string, password: string, nickname: string): Promise<{
		accessToken: string;
		refreshToken: string;
		user: any;
	}>;
}

interface TypedUserService {
	register: TypedRegister;
	activate: any;
}

export { TypedUserService, TypedRegister };
