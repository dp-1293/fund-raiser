import { Router } from 'express';
import { getNGOs, verifyNGO } from '../controllers/ngoController';
import { requireAuth, requireRole } from '../middlewares/auth';

const router = Router();

router.get('/', getNGOs);
router.patch('/:id/verify', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), verifyNGO);

export default router;
