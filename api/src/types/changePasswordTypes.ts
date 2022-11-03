import { Request } from 'express';

type ChangePasswordReq = {
	password: string;
	newPassword: string;
};

export interface TypedChangePasswordReq extends Request {
	userId: string;
	body: ChangePasswordReq;
}
