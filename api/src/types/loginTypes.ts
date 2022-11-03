import { Request } from 'express';

type LoginBodyReq = {
	email: string;
	password: string;
};

export interface TypedLoginBodyReq extends Request {
	body: LoginBodyReq;
	userId: string;
}
