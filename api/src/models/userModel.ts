import { Document, Schema, model } from 'mongoose';
import { User } from '../types';

const UserSchema = new Schema<User>(
	{
		email: { type: String, required: true, unique: true },
		nickname: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
		isActivated: { type: Boolean, required: true, default: false },
		activationLink: { type: String },
	},
	{ timestamps: true }
);

export default model<User>('User', UserSchema);
