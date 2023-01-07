import { Schema, model, connect } from 'mongoose';

interface IAccount {
    password: string;
    email: string;
    role: string;
    id: string;
    resetPasswordToken: string;
}

const accountSchema = new Schema<IAccount>({
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    resetPasswordToken: { type: String }
}, {
    timestamps: true,
    collection: 'accounts'
});

const UserModel = model<IAccount>('accounts', accountSchema);
export default UserModel;