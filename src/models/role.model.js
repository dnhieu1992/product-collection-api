import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId},
    name: { type: String, require: true },
    claims: [],
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Role', roleSchema);