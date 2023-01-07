"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const accountSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    resetPasswordToken: { type: String },
}, {
    timestamps: true,
    collection: 'accounts',
});
const UserModel = (0, mongoose_1.model)('accounts', accountSchema);
exports.default = UserModel;
//# sourceMappingURL=Account.js.map