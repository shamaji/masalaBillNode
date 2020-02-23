const Product = require('../../models/product.model');

// Create and Save a new Product
exports.create = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    // Create a Product
    const product = new Product({
        productName: req.body.productName,
        productPrice: req.body.productPrice
    });

    // Save Product in the database
    product.save().then(data => {
        if (data._id) {
            result = { data: data, status: true, message: 'Record inserted Success!' };
            res.send(result);
        } else {
            result = { data: {}, status: false, message: 'Fails to inserted record!' };
            res.send(result);
        }
    }).catch(err => {
        result = { data: {}, status: false, message: err.message || "Some error occurred while creating the Product." };
        res.send(result);
    });
};

// Retrieve and return all Product from the database.
exports.findAll = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    Product.find().then(productData => {
        result = { data: productData, status: true, message: 'Records found success!' };
        res.send(result);
    }).catch(err => {
        result = { data: {}, status: false, message: err.message || "Some error occurred while retrieving the Product." };
        res.send(result);
    });
};

// Find a single Product with a productId
exports.findOne = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    Product.findById(req.params.productId)
        .then(productData => {
            result = { data: productData, status: true, message: 'Record found success' };
            if (!productData) {
                result = { data: {}, status: false, message: 'Product not found with id ' + req.params.productId };
                return res.send(result);
            }
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                result = { data: {}, status: false, message: err.message || "Product not found with id " + req.params.productId };
                return res.send(result);
            }
            result = { data: {}, status: false, message: "Error retrieving Product with id " + req.params.productId };
            return res.send(result);
        });
};

// // Update a note identified by the noteId in the request
exports.update = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    // Find product and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        productName: req.body.productName,
        productPrice: req.body.productPrice
    }, { new: true })
        .then(product => {
            if (!product) {
                result = { data: {}, status: false, message: "product not found with id " + req.params.productId };
                return res.send(result);
            }
            result = { data: product, status: true, message: 'record updated success!' };
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                result = { data: {}, status: false, message: "product not found with id " + req.params.productId };
                return res.send(result);
            }
            result = { data: {}, status: false, message: "Error updating product with id " + req.params.productId };
            return res.send(result);
        });
};

// Delete a note with the specified productId in the request
exports.delete = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    Product.findByIdAndRemove(req.params.productId)
        .then(product => {
            if (!product) {
                result = { data: {}, status: false, message: "product not found with id " + req.params.productId };
                return res.send(result);
            }
            result = { data: product, status: true, message: 'product deleted successfully!' };
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                result = { data: {}, status: false, message: "product not found with id " + req.params.productId };
                return res.send(result);
            }
            result = { data: {}, status: false, message: "Could not delete product with id " + req.params.productId};
                return res.send(result);
        });
};
