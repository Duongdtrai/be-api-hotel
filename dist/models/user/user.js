"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
    phone: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'users',
});
const UserModel = (0, mongoose_1.model)('users', userSchema);
exports.default = UserModel;
//# sourceMappingURL=User.js.map