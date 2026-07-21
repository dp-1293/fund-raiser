import { Router } from 'express';
import { createDonation, getDonationsByCampaign, getUserDonations, downloadTaxReceiptPDF } from '../controllers/donationController';
import { requireAuth } from '../middlewares/auth';

const router = Router();

router.post('/', createDonation); // Public or authenticated
router.get('/campaign/:campaignId', getDonationsByCampaign);
router.get('/my-donations', requireAuth, getUserDonations);
router.get('/receipt/:donationId/pdf', downloadTaxReceiptPDF);

export default router;
