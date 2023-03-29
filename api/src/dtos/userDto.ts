import { User } from '../types';

class UserDto {
	email: string;
	id: string;
	isActivated: boolean;

	constructor(model: User) {
		this.email = model.email;
		this.id = model._id;
		this.isActivated = model.isActivated;
	}
}
export { UserDto };
