const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/product.controllers');

router.get('/products', ProductController.getProducts);
router.get('/products/:sku', ProductController.getProduct);
router.post('/products', ProductController.postProduct);
router.delete('/products/:sku', ProductController.deleteProduct);
router.delete('/products', ProductController.deleteProducts);
router.put('/products/:sku', ProductController.putProduct);
router.patch('/products/:sku', ProductController.patchProduct);

module.exports = router;
