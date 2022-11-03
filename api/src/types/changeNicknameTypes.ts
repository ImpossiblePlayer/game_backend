import { Request } from 'express';

type ChangeNicknameReq = {
	nickname: string;
};

export interface TypedChangeNicknameReq extends Request {
	body: ChangeNicknameReq;
	userId: string;
}
