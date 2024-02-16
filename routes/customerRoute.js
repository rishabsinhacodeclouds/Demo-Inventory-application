const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


router.post('/addCustomers', customerController.createCustomer);
router.get('/getAllCustomers', customerController.getAllCustomers);

module.exports = router;