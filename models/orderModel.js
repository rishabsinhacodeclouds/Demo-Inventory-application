const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    variant: String,
    quantity: Number,
    totalprice: Number,
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
