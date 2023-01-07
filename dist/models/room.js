"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const roomSchema = new mongoose_1.Schema({
    avatar: [String],
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    bed: { type: String, required: true },
    size: { type: Number },
    type: { type: String, required: true },
    service: [String],
}, {
    timestamps: true,
    collection: 'room',
});
const RoomModel = (0, mongoose_1.model)('room', roomSchema);
exports.default = RoomModel;
//# sourceMappingURL=Room.js.map