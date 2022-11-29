import { Request } from 'express';

type registerReqBody = {
	email: string;
	password: string;
	nickname: string;
};

interface TypedRegisterReq extends Request {
	body: registerReqBody;
}

export { TypedRegisterReq };
