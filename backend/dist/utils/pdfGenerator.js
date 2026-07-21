"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTaxReceiptPDFBuffer = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const generateTaxReceiptPDFBuffer = async (data) => {
    return new Promise((resolve, reject) => {
        const doc = new pdfkit_1.default({ margin: 50 });
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => resolve(Buffer.concat(buffers)));
        doc.on('error', reject);
        // Header
        doc.fillColor('#0284c7').fontSize(24).text('FundRaise Pro India', { align: 'center' });
        doc.fillColor('#64748b').fontSize(10).text('Empowering Every Donation | Section 80G Tax Exempt Charity Certificate', { align: 'center' });
        doc.moveDown(2);
        // Title
        doc.fillColor('#0f172a').fontSize(18).text('OFFICIAL DONATION & 80G TAX RECEIPT', { align: 'left', underline: true });
        doc.moveDown();
        // Details
        doc.fontSize(12).fillColor('#334155');
        doc.text(`Receipt Number: ${data.receiptNumber}`);
        doc.text(`Date Issued: ${data.date}`);
        doc.moveDown();
        doc.text(`Donor Name: ${data.donorName}`);
        doc.text(`Donor Email: ${data.donorEmail}`);
        doc.moveDown();
        doc.text(`Campaign: ${data.campaignTitle}`);
        doc.text(`Donation Amount: Rs. ${data.amount.toLocaleString('en-IN')} INR`);
        doc.text(`Eligible 80G Tax Deduction: Rs. ${data.amount.toLocaleString('en-IN')} INR`);
        doc.moveDown(2);
        // Footer Note
        doc.fontSize(10).fillColor('#64748b').text('Thank you for your generous contribution under Section 80G of the Income Tax Act, 1961. No goods or services were provided in exchange for this contribution.', { align: 'center' });
        doc.end();
    });
};
exports.generateTaxReceiptPDFBuffer = generateTaxReceiptPDFBuffer;
//# sourceMappingURL=pdfGenerator.js.map