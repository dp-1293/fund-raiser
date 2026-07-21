# FundRaise Pro - API Documentation

Base URL: `/api`

## Authentication Endpoint (`/api/auth`)
- `POST /api/auth/register`: Register new user/donor/NGO/volunteer.
- `POST /api/auth/login`: Authenticate and obtain JWT access & refresh tokens.
- `POST /api/auth/refresh-token`: Issue new short-lived access token.
- `GET /api/auth/me`: Retrieve current authenticated profile.

## Campaigns (`/api/campaigns`)
- `GET /api/campaigns`: Fetch campaigns with category, search query, urgent, and sort filters.
- `GET /api/campaigns/categories`: List all 8 cause categories.
- `GET /api/campaigns/:slugOrId`: Retrieve single campaign detail view.
- `POST /api/campaigns`: Create new campaign (Auth required).

## Donations (`/api/donations`)
- `POST /api/donations`: Process new donation via Stripe, Razorpay, or UPI QR code.
- `GET /api/donations/campaign/:campaignId`: Retrieve donation wall list for a campaign.
- `GET /api/donations/my-donations`: Retrieve user donation history & tax receipts.
- `GET /api/donations/receipt/:donationId/pdf`: Generate & stream PDF tax deductible receipt.

## Volunteers (`/api/volunteers`)
- `GET /api/volunteers`: Retrieve volunteer directory.
- `GET /api/volunteers/tasks`: List volunteer tasks.
- `POST /api/volunteers/tasks/assign`: Assign volunteer to task.

## Analytics (`/api/analytics`)
- `GET /api/analytics/overview`: Retrieve platform revenue, daily/monthly donation metrics, Recharts statistics.
