const Company = require('../../models/company.model');

// Create and Save a new Company
exports.create = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    // Create a Company
    const company = new Company({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        companyName: req.body.companyName,
        companyGSTN: req.body.companyGSTN,
        companyMobile: req.body.companyMobile,
        companyAddress: req.body.companyAddress,
        companyCity: req.body.companyCity,
        isActive: false
    });

    // Save Company in the database
    company.save().then(data => {
        if (data._id) {
            result = { data: data, status: true, message: 'Record inserted Success!' };
            res.send(result);
        } else {
            result = { data: {}, status: false, message: 'Fails to inserted record!' };
            res.send(result);
        }
    }).catch(err => {
        result = { data: {}, status: false, message: err.message || "Some error occurred while creating the Company." };
        res.send(result);
    });
};

// Retrieve and return all Company from the database.
exports.findAll = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    Company.find().then(companyData => {
        result = { data: companyData, status: false, message: '' };
        res.send(result);
    }).catch(err => {
        result = { data: {}, status: false, message: err.message || "Some error occurred while retrieving the Company." };
        res.send(result);
    });
};

// Find a single company with a companyId
exports.findOne = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    Company.findById(req.params.companyId)
        .then(companyData => {
            result = { data: companyData, status: true, message: '' };
            if (!companyData) {
                result = { data: {}, status: false, message: 'Company not found with id ' + req.params.companyId };
                return res.send(result);
            }
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                result = { data: {}, status: false, message: err.message || "Company not found with id " + req.params.companyId };
                return res.send(result);
            }
            result = { data: {}, status: false, message: "Error retrieving Company with id " + req.params.companyId };
            return res.send(result);
        });
};

// login from company table
exports.login = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    let query = { username: req.body.username, password: req.body.password };
    Company.findOne(query).then(userData => {
            console.log('userData : ', userData)
            result = { data: userData, status: true, message: 'User found success' };
            if (!userData) {
                result = { data: {}, status: false, message: 'User not found with id ' };
                return res.send(result);
            }
            res.send(result);
        }).catch(err => {
            result = { data: {}, status: false, message: err.message || "Error retrieving User" };
            return res.send(result);
        });
};
