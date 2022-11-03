import mongoose, { Schema, model } from 'mongoose';

interface SessionResult<T> extends mongoose.Document {
	_doc: T;
}

interface Session extends SessionResult<Session> {
	closeVotes: number;
}

const SessionSchema = new Schema<Session>(
	{
		closeVotes: { type: Number, required: true },
	},
	{ timestamps: true }
);

export default model<Session>('Session', SessionSchema);
