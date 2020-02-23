const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
    qty: Number,
    amount: Number,
    totalAmount: Number,
    productIds: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bill', BillSchema);
