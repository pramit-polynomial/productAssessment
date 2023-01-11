const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('brand', brandSchema);