const { Router } = require('express');
const productModel = require('../dao/models/product.model');

const router = Router();

router.get('/', async (req, res) => {
  const products = await productModel.find().lean();
  res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

router.get('/products/:pid', async (req, res) => {
  const product = await productModel.findById(req.params.pid).lean();
  res.render('productDetail', { product });
});

module.exports = router;
