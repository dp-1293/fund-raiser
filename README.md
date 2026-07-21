# FundRaise Pro - SaaS Fundraising Platform

> **"Empowering Every Donation"**

FundRaise Pro is a production-ready, full-stack SaaS fundraising platform built with React 19, Vite, TypeScript, Material UI, Tailwind CSS, Node.js, Express, Prisma ORM, MySQL 8, Socket.IO, and Docker.

---

## 🌟 Key Features

- **Modern Glassmorphism UI**: High-contrast dark theme, vibrant gradients, micro-animations with Framer Motion, and responsive layouts.
- **Urgent Emergency Explorer**: Filter campaigns across Medical, Disaster Relief, Education, Animal Welfare, Children, Environment, Women Empowerment, and Community.
- **Interactive Multi-Gateway Donation Flow**: Supports Stripe (Card), Razorpay, and instant UPI QR Code payments with customizable preset/custom amounts, one-time vs recurring toggles, anonymous donations, and dedication notes.
- **Automated 501(c)(3) PDF Tax Receipts**: On-the-fly PDF generation (`pdfkit`) for instant donor download.
- **Real-Time Live Donor Ticker**: Socket.IO integration broadcasting live contributions to campaign pages.
- **Role-Based Access Control**: Super Admin, Admin, Campaign Manager, NGO, Volunteer, and Donor dashboards.
- **Comprehensive Analytics**: Interactive Recharts analytics tracking revenue, category performance, top donors, and growth metrics.
- **Robust Database Seeder**: Includes realistic sample data with 50 Users, 20 Campaigns, 1,000+ Donations, 20 Volunteers, and 10 NGOs.

---

## 🏗 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS, Material UI, Framer Motion, React Router, Recharts, React Hook Form, Zod, Axios, Socket.IO Client |
| **Backend** | Node.js, Express, TypeScript, Prisma ORM, Socket.IO, JWT, bcryptjs, Nodemailer, PDFKit, Multer |
| **Database** | MySQL 8 (with Prisma Schema & Migrations) |
| **Deployment** | Docker, Docker Compose, Nginx Reverse Proxy |

---

## 🚀 Quick Start (Local Development)

### Option 1: Standard Node Setup

1. **Clone & Setup Environment**:
   ```bash
   cp .env.example .env
   ./scripts/setup.sh
   ```

2. **Run Backend API Server**:
   ```bash
   cd backend
   npm run dev
   ```
   *Backend will run at `http://localhost:5000`*

3. **Run Frontend Web App**:
   ```bash
   cd frontend
   x
   ```
   *Frontend will run at `http://localhost:3000`*

---

### Option 2: Docker Compose Setup

Run the full production stack (Frontend, Backend, MySQL 8, and Nginx reverse proxy):

```bash
docker compose up --build
```

Access the platform at `http://localhost`.

---

## 🔐 Demo User Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `admin@fundraisepro.org` | `password123` |
| **NGO Manager** | `ngo@fundraisepro.org` | `password123` |
| **Volunteer** | `volunteer@fundraisepro.org` | `password123` |
| **Donor** | `donor1@example.com` | `password123` |

---

## 📄 License

FundRaise Pro is open-source software licensed under the MIT License.
