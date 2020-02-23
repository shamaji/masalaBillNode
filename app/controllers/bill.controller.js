const Bill = require('../../models/bill.model');

// Create and Save a new Bill
exports.create = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    // Create a bill
    const bill = new Bill({
        qty: req.body.qty,
        amount: req.body.amount,
        totalAmount: req.body.totalAmount,
        productIds: req.body.productIds
    });

    // Save Bill in the database
    bill.save().then(data => {
        if (data._id) {
            result = { data: data, status: true, message: 'Record inserted Success!' };
            res.send(result);
        } else {
            result = { data: {}, status: false, message: 'Fails to inserted record!' };
            res.send(result);
        }
    }).catch(err => {
        result = { data: {}, status: false, message: err.message || "Some error occurred while creating the bill." };
        res.send(result);
    });
};

// Retrieve and return all bill from the database.
exports.findAll = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    Bill.find().populate('productIds').then(billData => {
        result = { data: billData, status: true, message: 'Records found success!' };
        res.send(result);
    }).catch(err => {
        result = { data: {}, status: false, message: err.message || "Some error occurred while retrieving the bill." };
        res.send(result);
    });
};

// Find a single bill with a billId
exports.findOne = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    Bill.findById(req.params.billId).populate('productIds')
        .then(billData => {
            result = { data: billData, status: true, message: 'Record found success' };
            if (!billData) {
                result = { data: {}, status: false, message: 'bill not found with id ' + req.params.billId };
                return res.send(result);
            }
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                result = { data: {}, status: false, message: err.message || "bill not found with id " + req.params.billId };
                return res.send(result);
            }
            result = { data: {}, status: false, message: "Error retrieving bill with id " + req.params.billId };
            return res.send(result);
        });
};

// // Update a note identified by the noteId in the request
exports.update = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    // Find bill and update it with the request body
    Bill.findByIdAndUpdate(req.params.billId, {
        qty: req.body.qty,
        amount: req.body.amount,
        totalAmount: req.body.totalAmount,
        productIds: req.body.productIds
    }, { new: true })
        .then(bill => {
            if (!bill) {
                result = { data: {}, status: false, message: "bill not found with id " + req.params.billId };
                return res.send(result);
            }
            result = { data: bill, status: true, message: 'record updated success!' };
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                result = { data: {}, status: false, message: "bill not found with id " + req.params.billId };
                return res.send(result);
            }
            result = { data: {}, status: false, message: "Error updating bill with id " + req.params.billId };
            return res.send(result);
        });
};

// Delete a note with the specified billId in the request
exports.delete = (req, res) => {
    let result = { data: {}, status: false, message: '' };
    Bill.findByIdAndRemove(req.params.billId)
        .then(bill => {
            if (!bill) {
                result = { data: {}, status: false, message: "bill not found with id " + req.params.billId };
                return res.send(result);
            }
            result = { data: bill, status: true, message: 'bill deleted successfully!' };
            res.send(result);
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                result = { data: {}, status: false, message: "bill not found with id " + req.params.billId };
                return res.send(result);
            }
            result = { data: {}, status: false, message: "Could not delete bill with id " + req.params.billId };
            return res.send(result);
        });
};
