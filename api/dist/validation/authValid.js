"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.regValidation = void 0;
const express_validator_1 = require("express-validator");
const regValidation = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 8 }),
    (0, express_validator_1.body)('nickname').isAlpha(),
];
exports.regValidation = regValidation;
const loginValidation = [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('password').isLength({ min: 8 }),
];
exports.loginValidation = loginValidation;
//# sourceMappingURL=authValid.js.map