import { Router } from 'express';
import { getMe, login, register } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.js';
import { loginValidator, registerValidator } from '../validators/auth.validators.js';

const router = Router();

router.post('/register', registerValidator, validate, register);
router.post('/login', loginValidator, validate, login);
router.get('/me', requireAuth, getMe);

export default router;
