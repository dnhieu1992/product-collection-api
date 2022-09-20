import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId() },
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    firstName: String,
    lastName: String,
    address: String,
    phoneNumber: String,
    tokens: [],
    roles: [{
        type: String
    }],
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export default mongoose.model('User', userSchema);