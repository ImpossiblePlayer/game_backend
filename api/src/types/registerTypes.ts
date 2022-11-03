import { Request } from 'express';

type RegisterBodyReq = {
	email: string;
	password: string;
	nickname: string;
};

export interface TypedRegisterBodyReq extends Request {
	body: RegisterBodyReq;
	userId: string;
}
