import request from 'supertest';
import { app } from './../index';

describe('/auth/register', () => {
	it('should return 400 for invalid input', async () => {
		await request(app)
			.post('auth/register')
			.send({
				email: 'bademail',
				password: 'valid password',
				nickname: 'valid nickname',
			})
			.expect(400);
	});
});

// ДОДЕЛАТЬ ТЕСТЫ
