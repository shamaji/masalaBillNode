const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String,
    companyName: String,
    companyGSTN: String,
    companyMobile: String,
    companyAddress: String,
    companyCity: String,
    isActive: Boolean
}, {
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);
