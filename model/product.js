const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const productSchema = mongoose.Schema({
    name: { type: String, require: true, trim: true },
    price: { type: Number, require: true, trim: true },
    description: { type: String, required: true, trim: true },
    brand: { type: ObjectId, ref: 'brand', required: true, trim: true, },
    quantity: { type: Number, require, trim: true }
}, {
    timestamps: true,
})

module.exports = mongoose.model('product', productSchema);
