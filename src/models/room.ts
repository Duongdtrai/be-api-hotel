
import { Schema, model } from "mongoose";

interface IRoom {
    avatar: Array<string>
    title: string
    description: string
    price: number
    bed: string
    size: number
    type: string
    service: Array<string>
}

const roomSchema = new Schema<IRoom>({
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
    collection: 'room'
});

const RoomModel = model<IRoom>('room', roomSchema);
export default RoomModel;