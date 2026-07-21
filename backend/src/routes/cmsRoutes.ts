import { Router } from 'express';
import { getBlogPosts, getFAQs, getPartners } from '../controllers/cmsController';

const router = Router();

router.get('/blogs', getBlogPosts);
router.get('/faqs', getFAQs);
router.get('/partners', getPartners);

export default router;
