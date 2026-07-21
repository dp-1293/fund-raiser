import { Router } from 'express';
import { register, login, refreshToken, me } from '../controllers/authController';
import { requireAuth } from '../middlewares/auth';
import { authRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.post('/register', authRateLimiter, register);
router.post('/login', authRateLimiter, login);
router.post('/refresh-token', refreshToken);
router.get('/me', requireAuth, me);

export default router;
