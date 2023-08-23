const express = require ('express');
const router = express.Router();

const {getProduct} = require('../controller/productController')


router.route('/product').get(getProduct);

module.exports = router