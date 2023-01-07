import { Schema, model } from "mongoose";
interface IRentRoom {
    roomId: string
    userId: string,
    identityCard: string,
    note: string
    startDate: string,
    endDate: string,
}
const rentRoomSchema = new Schema<IRentRoom>({
    userId: { type: String, required: true },
    roomId: { type: String, required: true },
    identityCard: { type: String, required: true },
    note: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'rent-room'
});

const RentRoomModel = model<IRentRoom>('rent-room', rentRoomSchema);
export default RentRoomModel;


