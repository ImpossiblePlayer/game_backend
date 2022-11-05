import { Document, Schema, model } from 'mongoose';
import UserModel from './user';

interface SessionResult<T> extends Document {
	_doc: T;
}

interface Session extends SessionResult<Session> {
	closeVotes: number;
	users: typeof UserModel;
}

const SessionSchema = new Schema<Session>(
	{
		closeVotes: { type: Number, required: true },
		users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
	},
	{ timestamps: true }
);

export default model<Session>('Session', SessionSchema);
