const { Router } = require('express');
const { authorization } = require('../middlewares/auth.middleware');
const jwtAuth = require('../middlewares/jwtAuth.middleware');

const { getProducts, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');

const router = Router();

router.get('/', getProducts);
router.post('/', jwtAuth, authorization('admin'), createProduct);
router.put('/:pid', jwtAuth, authorization('admin'), updateProduct);
router.delete('/:pid', jwtAuth, authorization('admin'), deleteProduct);

module.exports = router;