const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    variants: [
        {
            name: { type: String, required: true },
            quantity: { type: Number, default: 0 },
            price: { type: Number, required: true },
            status: { type: String, enum: ['Available', 'Out-of-Stock'], default: 'Available' },
        },
    ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;