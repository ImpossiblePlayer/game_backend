"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SessionSchema = new mongoose_1.Schema({
    closeVotes: { type: Number, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Session', SessionSchema);
//# sourceMappingURL=session.js.map