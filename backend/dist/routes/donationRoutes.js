"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const donationController_1 = require("../controllers/donationController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.post('/', donationController_1.createDonation); // Public or authenticated
router.get('/campaign/:campaignId', donationController_1.getDonationsByCampaign);
router.get('/my-donations', auth_1.requireAuth, donationController_1.getUserDonations);
router.get('/receipt/:donationId/pdf', donationController_1.downloadTaxReceiptPDF);
exports.default = router;
//# sourceMappingURL=donationRoutes.js.map