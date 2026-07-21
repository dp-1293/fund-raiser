import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { mockDonations, mockCampaigns } from '../services/store';
import { emitNewDonation } from '../socket';
import { sendDonationReceiptEmail } from '../utils/mailer';
import { generateTaxReceiptPDFBuffer } from '../utils/pdfGenerator';

export const createDonation = async (req: any, res: Response) => {
  try {
    const { campaignId, amount, donorName, donorEmail, isAnonymous, isRecurring, paymentGateway, dedicationMessage } = req.body;

    const campaign = mockCampaigns.find(c => c.id === campaignId);
    if (!campaign) {
      return sendError(res, 'Campaign not found', 404);
    }

    const numericAmount = parseFloat(amount);
    const receiptNumber = `RCPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const newDonation = {
      id: `don-${mockDonations.length + 1}`,
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

    mockDonations.unshift(newDonation);

    // Socket real-time broadcast
    emitNewDonation(newDonation);

    // Async Email notification
    sendDonationReceiptEmail(newDonation.donorEmail, newDonation.donorName, numericAmount, campaign.title, receiptNumber);

    return sendSuccess(res, newDonation, 'Donation processed successfully', 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Donation failed', 500);
  }
};

export const getDonationsByCampaign = async (req: Request, res: Response) => {
  try {
    const { campaignId } = req.params;
    const donations = mockDonations.filter(d => d.campaignId === campaignId);
    return sendSuccess(res, donations, 'Donations retrieved');
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

export const getUserDonations = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const userDonations = mockDonations.filter(d => d.donorId === userId || d.donorEmail === userEmail);
    return sendSuccess(res, userDonations, 'User donation history retrieved');
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

export const downloadTaxReceiptPDF = async (req: Request, res: Response) => {
  try {
    const { donationId } = req.params;
    const donation = mockDonations.find(d => d.id === donationId || d.transactionId === donationId);

    if (!donation) {
      return sendError(res, 'Donation record not found', 404);
    }

    const pdfBuffer = await generateTaxReceiptPDFBuffer({
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
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to generate tax receipt', 500);
  }
};
