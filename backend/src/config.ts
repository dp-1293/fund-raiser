import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '5005', 10),
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  apiUrl: process.env.API_URL || 'http://localhost:5000',
  jwt: {
    secret: process.env.JWT_SECRET || 'super_secret_jwt_access_key_fundraise_pro_2026',
    expiresIn: process.env.JWT_EXPIRES_IN || '15m',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'super_secret_jwt_refresh_key_fundraise_pro_2026',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
  },
  payments: {
    stripeSecret: process.env.STRIPE_SECRET_KEY || 'sk_test_mock',
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_mock',
    razorpayKeyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_mock',
    razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || 'mock_secret',
    upiVpa: process.env.UPI_VPA || 'fundraisepro@upi',
  },
  email: {
    host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
    port: parseInt(process.env.SMTP_PORT || '2525', 10),
    user: process.env.SMTP_USER || 'mock_user',
    pass: process.env.SMTP_PASS || 'mock_pass',
    from: process.env.EMAIL_FROM || 'FundRaise Pro <noreply@fundraisepro.org>',
  },
};
