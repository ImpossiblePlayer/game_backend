class UserDto {
	email: string;
	id: string;
	isActivated: string;

	constructor(model) {
		this.email = model.email;
		this.id = model._id;
		this.isActivated = model.isActivated;
	}
}
export { UserDto };
