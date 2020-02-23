const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    productName: String,
    productPrice: Number
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', ProductSchema);
