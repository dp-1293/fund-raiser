"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendDonationReceiptEmail = exports.sendWelcomeEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../config");
const transporter = nodemailer_1.default.createTransport({
    host: config_1.config.email.host,
    port: config_1.config.email.port,
    auth: {
        user: config_1.config.email.user,
        pass: config_1.config.email.pass,
    },
});
const sendWelcomeEmail = async (email, name) => {
    const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc;">
      <h1 style="color: #38bdf8;">Welcome to FundRaise Pro!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining FundRaise Pro — Empowering Every Donation. Together we create real impact.</p>
      <a href="${config_1.config.frontendUrl}/campaigns" style="background-color: #0284c7; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Explore Campaigns</a>
    </div>
  `;
    try {
        await transporter.sendMail({
            from: config_1.config.email.from,
            to: email,
            subject: 'Welcome to FundRaise Pro!',
            html,
        });
    }
    catch (err) {
        console.log('Email delivery mock log for:', email);
    }
};
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendDonationReceiptEmail = async (email, name, amount, campaignTitle, receiptNumber) => {
    const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc;">
      <h2 style="color: #10b981;">Donation Receipt Confirmation</h2>
      <p>Dear ${name},</p>
      <p>Your donation of <strong>$${amount.toFixed(2)}</strong> to <em>"${campaignTitle}"</em> was processed successfully.</p>
      <p><strong>Receipt Number:</strong> ${receiptNumber}</p>
      <p>Thank you for making a difference!</p>
    </div>
  `;
    try {
        await transporter.sendMail({
            from: config_1.config.email.from,
            to: email,
            subject: `Donation Receipt #${receiptNumber} - FundRaise Pro`,
            html,
        });
    }
    catch (err) {
        console.log('Receipt email mock log for:', receiptNumber);
    }
};
exports.sendDonationReceiptEmail = sendDonationReceiptEmail;
//# sourceMappingURL=mailer.js.map