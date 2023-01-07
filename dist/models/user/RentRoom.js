"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const rentRoomSchema = new mongoose_1.Schema({
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    identityCard: { type: String, required: true },
    note: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'rent-room',
});
const RentRoomModel = (0, mongoose_1.model)('rent-room', rentRoomSchema);
exports.default = RentRoomModel;
//# sourceMappingURL=RentRoom.js.map