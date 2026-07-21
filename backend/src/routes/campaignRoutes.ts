import { Router } from 'express';
import { getCampaigns, getCampaignBySlugOrId, createCampaign, getCategories } from '../controllers/campaignController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.get('/categories', getCategories);
router.get('/', getCampaigns);
router.get('/:slugOrId', getCampaignBySlugOrId);
router.post('/', requireAuth, createCampaign);

export default router;
