const mongoose = require('mongoose');

const refundSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    refundedQuantity: { type: Number, required: true },
    refundAmount: { type: Number, required: true },
});

const Refund = mongoose.model('Refund', refundSchema);

module.exports = Refund;