import { Schema, model, connect } from 'mongoose';

interface IUser {
    email: string;
    role: string;
    status: string;
    phone: string;
    fullName: string;
    avatar?: string;
    address?: string;
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
    phone: { type: String, required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
}, {
    timestamps: true,
    collection: 'users'
});

const UserModel = model<IUser>('users', userSchema);
export default UserModel;