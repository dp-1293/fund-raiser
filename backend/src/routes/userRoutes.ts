import { Router } from 'express';
import { getUsers, updateUserRole } from '../controllers/userController';
import { requireAuth, requireRole } from '../middlewares/auth';

const router = Router();

router.get('/', requireAuth, requireRole(['SUPER_ADMIN', 'ADMIN']), getUsers);
router.patch('/:id/role', requireAuth, requireRole(['SUPER_ADMIN']), updateUserRole);

export default router;
