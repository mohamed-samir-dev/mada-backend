const router = require('express').Router();
const protect = require('../middlewares/auth');
const { createOrder, getOrders, getOrder, updateOrderStatus } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.put('/:id/status', protect, updateOrderStatus);

module.exports = router;
