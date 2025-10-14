const express = require('express');
const { purchaseCart } = require('../controllers/carts.controller');
const { authToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/:cid/purchase', authToken, purchaseCart);

module.exports = router;
