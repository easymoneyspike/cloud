import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        nick: { type: String },
        email: { type: String, required: true },
        password: { type: String, required: true },
    },
    { versionKey: false }
);
  
const User = mongoose.model('User', UserSchema)

export default  User;