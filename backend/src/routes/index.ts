import { Router } from 'express';
import authRoutes from './authRoutes';
import campaignRoutes from './campaignRoutes';
import donationRoutes from './donationRoutes';
import userRoutes from './userRoutes';
import ngoRoutes from './ngoRoutes';
import volunteerRoutes from './volunteerRoutes';
import analyticsRoutes from './analyticsRoutes';
import cmsRoutes from './cmsRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/campaigns', campaignRoutes);
router.use('/donations', donationRoutes);
router.use('/users', userRoutes);
router.use('/ngos', ngoRoutes);
router.use('/volunteers', volunteerRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/cms', cmsRoutes);

export default router;
