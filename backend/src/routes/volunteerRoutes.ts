import { Router } from 'express';
import { getVolunteers, getVolunteerTasks, assignTask } from '../controllers/volunteerController';

const router = Router();

router.get('/', getVolunteers);
router.get('/tasks', getVolunteerTasks);
router.post('/tasks/assign', assignTask);

export default router;
