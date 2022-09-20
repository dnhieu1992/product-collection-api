import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId() },
    reviewDate: { type: Date, default: Date.now },
    link: { type: String, require: true },
    shopName: { type: String, require: true },
    keyWord: String,
    productType1: String,
    productType2: String,
    price: Number,
    reviewContent: { type: String },
    reviewImages: [{
        type: String
    }],
    reviewVideos: [{
        type: String
    }],
    orderId: { type: String },
    shippingCode: { type: String },
    totalPrice: { type: Number },
    isReceived: { type: Boolean, default: false },
    isReviewed: { type: Boolean, default: false },
    reasonNoReview: { type: String },
    reviewer: { type: String },
    customer: { type: String },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
export default mongoose.model('Product', productSchema);