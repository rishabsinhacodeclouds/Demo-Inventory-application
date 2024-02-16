const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/placeOrders', orderController.placeOrder);
router.post('/return', orderController.processReturn);

module.exports = router;