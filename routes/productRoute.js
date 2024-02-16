const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/getAllProducts', productController.getAllProducts);
router.post('/addProducts', productController.createProduct);
router.put('/updateProduct/:id', productController.updateProduct);
router.put('/updateVariant/:id/:variantid', productController.updateVariant);

module.exports = router;