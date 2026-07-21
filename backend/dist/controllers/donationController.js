"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadTaxReceiptPDF = exports.getUserDonations = exports.getDonationsByCampaign = exports.createDonation = void 0;
const response_1 = require("../utils/response");
const store_1 = require("../services/store");
const socket_1 = require("../socket");
const mailer_1 = require("../utils/mailer");
const pdfGenerator_1 = require("../utils/pdfGenerator");
const createDonation = async (req, res) => {
    try {
        const { campaignId, amount, donorName, donorEmail, isAnonymous, isRecurring, paymentGateway, dedicationMessage } = req.body;
        const campaign = store_1.mockCampaigns.find(c => c.id === campaignId);
        if (!campaign) {
            return (0, response_1.sendError)(res, 'Campaign not found', 404);
        }
        const numericAmount = parseFloat(amount);
        const receiptNumber = `RCPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const newDonation = {
            id: `don-${store_1.mockDonations.length + 1}`,
            campaignId: campaign.id,
            campaignTitle: campaign.title,
            donorId: req.user ? req.user.id : null,
            donorName: isAnonymous ? 'Anonymous Supporter' : (donorName || 'Generous Supporter'),
            donorEmail: donorEmail || (req.user ? req.user.email : 'donor@example.com'),
            amount: numericAmount,
            currency: 'USD',
            isAnonymous: Boolean(isAnonymous),
            isRecurring: Boolean(isRecurring),
            paymentGateway: paymentGateway || 'STRIPE',
            transactionId: `TXN-${Date.now()}`,
            status: 'SUCCESS',
            dedicationMessage: dedicationMessage || null,
            receiptNumber,
            createdAt: new Date().toISOString(),
        };
        // Update campaign raised amount and donor count
        campaign.raisedAmount += numericAmount;
        campaign.donationsCount = (campaign.donationsCount || 0) + 1;
        store_1.mockDonations.unshift(newDonation);
        // Socket real-time broadcast
        (0, socket_1.emitNewDonation)(newDonation);
        // Async Email notification
        (0, mailer_1.sendDonationReceiptEmail)(newDonation.donorEmail, newDonation.donorName, numericAmount, campaign.title, receiptNumber);
        return (0, response_1.sendSuccess)(res, newDonation, 'Donation processed successfully', 201);
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message || 'Donation failed', 500);
    }
};
exports.createDonation = createDonation;
const getDonationsByCampaign = async (req, res) => {
    try {
        const { campaignId } = req.params;
        const donations = store_1.mockDonations.filter(d => d.campaignId === campaignId);
        return (0, response_1.sendSuccess)(res, donations, 'Donations retrieved');
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 500);
    }
};
exports.getDonationsByCampaign = getDonationsByCampaign;
const getUserDonations = async (req, res) => {
    try {
        const userId = req.user.id;
        const userEmail = req.user.email;
        const userDonations = store_1.mockDonations.filter(d => d.donorId === userId || d.donorEmail === userEmail);
        return (0, response_1.sendSuccess)(res, userDonations, 'User donation history retrieved');
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 500);
    }
};
exports.getUserDonations = getUserDonations;
const downloadTaxReceiptPDF = async (req, res) => {
    try {
        const { donationId } = req.params;
        const donation = store_1.mockDonations.find(d => d.id === donationId || d.transactionId === donationId);
        if (!donation) {
            return (0, response_1.sendError)(res, 'Donation record not found', 404);
        }
        const pdfBuffer = await (0, pdfGenerator_1.generateTaxReceiptPDFBuffer)({
            receiptNumber: donation.receiptNumber || `RCPT-${donation.id}`,
            donorName: donation.donorName,
            donorEmail: donation.donorEmail,
            amount: donation.amount,
            campaignTitle: donation.campaignTitle,
            date: new Date(donation.createdAt).toLocaleDateString(),
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=tax-receipt-${donation.id}.pdf`);
        return res.send(pdfBuffer);
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message || 'Failed to generate tax receipt', 500);
    }
};
exports.downloadTaxReceiptPDF = downloadTaxReceiptPDF;
//# sourceMappingURL=donationController.js.map