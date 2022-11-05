import { Document, Schema, model } from 'mongoose';
import { UserModel } from '.';

interface TokenResult<T> extends Document {
	_doc: T;
}

interface Token extends TokenResult<Token> {
	user: typeof UserModel;
	refreshToken: string;
}

const TokenSchema = new Schema<Token>(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
		refreshToken: { type: String, required: true },
	},
	{ timestamps: true }
);

export default model<Token>('Token', TokenSchema);
