const mongoose = require('mongoose');
const product = require("../model/product")
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema({
    productId: { type: ObjectId, ref: 'product', required: true, trim: true, },
    quantity: { type: Number, required: true, trim: true, min: 1 },
    totalPrice: { type: Number, trim: true },
    userId: { type: ObjectId, ref: 'user', required: true, trim: true, },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);