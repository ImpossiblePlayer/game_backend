"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("./../index");
describe('/auth/register', () => {
    it('should return 400 for invalid input', async () => {
        await (0, supertest_1.default)(index_1.app)
            .post('auth/register')
            .send({
            email: 'bademail',
            password: 'valid password',
            nickname: 'valid nickname',
        })
            .expect(400);
    });
});
//# sourceMappingURL=api.test.js.map