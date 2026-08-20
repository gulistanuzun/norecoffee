import { Router } from 'express';
import { createOrder, getMyOrderById, getMyOrders } from '../controllers/order.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { createOrderValidator } from '../validators/order.validators.js';

const router = Router();

router.use(requireAuth);
router.post('/', createOrderValidator, validate, createOrder);
router.get('/mine', getMyOrders);
router.get('/mine/:id', getMyOrderById);

export default router;
