"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = void 0;
const express_validator_1 = require("express-validator");
const index_1 = require("../index");
const handleValidationErrors = (req, res, next) => {
    if (!(0, express_validator_1.validationResult)(req).isEmpty()) {
        return res.status(index_1.HTTP_STATUSES.BAD_REQUEST_400);
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
//# sourceMappingURL=handleValidationErrors.js.map