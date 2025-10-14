const { Router } = require('express');
const { getCurrent } = require('../controllers/user.controller');
const jwtAuth = require('../middlewares/jwtAuth.middleware');

const router = Router();
router.get('/current', jwtAuth, getCurrent);
module.exports = router;
