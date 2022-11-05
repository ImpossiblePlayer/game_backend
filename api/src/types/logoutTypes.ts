import { Request } from 'express';

type LogoutBodyReq = {
	email: string;
	password: string;
};

export interface TypedLogoutBodyReq extends Request {
	body: LogoutBodyReq;
	userId: string;
}
