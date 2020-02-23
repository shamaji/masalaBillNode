module.exports = (app) => {
    const company = require('../controllers/company.controller');
    const product = require('../controllers/product.controller');
    const bill = require('../controllers/bill.controller');

    // Create a new company
    app.post('/login', company.login);
    // Create a new company
    app.post('/company', company.create);

    // Retrieve all company
    app.get('/company', company.findAll);

    // Retrieve a single company with companyId
    app.get('/company/:companyId', company.findOne);

    // Update a company with companyId
    // app.put('/company/:companyId', company.update);

    // Delete a company with companyId
    // app.delete('/company/:companyId', company.delete);

    // Create a new product
    app.post('/product', product.create);

    // Retrieve all product
    app.get('/product', product.findAll);

    // Retrieve a single product with productId
    app.get('/product/:productId', product.findOne);

    // Update a product with productId
    app.put('/product/:productId', product.update);

    // Delete a product with productId
    app.delete('/product/:productId', product.delete);

    // Create a new bill
    app.post('/bill', bill.create);

    // Retrieve all bill
    app.get('/bill', bill.findAll);

    // Retrieve a single bill with billId
    app.get('/bill/:billId', bill.findOne);

    // Update a bill with billId
    app.put('/bill/:billId', bill.update);

    // Delete a bill with billId
    app.delete('/bill/:billId', bill.delete);
}
