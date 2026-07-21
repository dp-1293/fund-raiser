import nodemailer from 'nodemailer';
import { config } from '../config';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

export const sendWelcomeEmail = async (email: string, name: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc;">
      <h1 style="color: #38bdf8;">Welcome to FundRaise Pro!</h1>
      <p>Hi ${name},</p>
      <p>Thank you for joining FundRaise Pro — Empowering Every Donation. Together we create real impact.</p>
      <a href="${config.frontendUrl}/campaigns" style="background-color: #0284c7; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">Explore Campaigns</a>
    </div>
  `;
  try {
    await transporter.sendMail({
      from: config.email.from,
      to: email,
      subject: 'Welcome to FundRaise Pro!',
      html,
    });
  } catch (err) {
    console.log('Email delivery mock log for:', email);
  }
};

export const sendDonationReceiptEmail = async (
  email: string,
  name: string,
  amount: number,
  campaignTitle: string,
  receiptNumber: string
) => {
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
      from: config.email.from,
      to: email,
      subject: `Donation Receipt #${receiptNumber} - FundRaise Pro`,
      html,
    });
  } catch (err) {
    console.log('Receipt email mock log for:', receiptNumber);
  }
};
