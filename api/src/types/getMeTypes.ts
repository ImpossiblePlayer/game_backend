import { Request } from 'express';

type GetMeBodyReq = {
	email: string;
	password: string;
};

export interface TypedGetMeBodyReq extends Request {
	body: GetMeBodyReq;
	userId: string;
}
