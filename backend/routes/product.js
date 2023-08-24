const express = require ('express');
const router = express.Router();

const {getProducts, newProduct} = require('../controller/productController')


router.route('/product').get(getProducts);

router.route('/product/new').post(newProduct);

module.exports = router