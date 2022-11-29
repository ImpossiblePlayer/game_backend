import { Schema, model } from 'mongoose';
import { Token } from '../types';

const TokenSchema = new Schema<Token>(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		refreshToken: { type: String, required: true },
	},
	{ timestamps: true }
);

export default model<Token>('Token', TokenSchema);
