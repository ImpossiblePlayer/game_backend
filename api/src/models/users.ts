import mongoose, { Schema, model } from 'mongoose';

interface UserResult<T> extends mongoose.Document {
	_doc: T;
}

interface User extends UserResult<User> {
	nickname: string;
	email: string;
	passwordHash: string;
}

const UserSchema = new Schema<User>(
	{
		nickname: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
	},
	{ timestamps: true }
);

export default model<User>('User', UserSchema);
