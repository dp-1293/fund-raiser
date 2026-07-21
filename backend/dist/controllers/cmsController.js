"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPartners = exports.getFAQs = exports.getBlogPosts = exports.mockPartners = exports.mockFAQs = exports.mockBlogPosts = void 0;
const response_1 = require("../utils/response");
exports.mockBlogPosts = [
    {
        id: 'blog-1',
        title: 'How Transparency in Donating Transforms Global Charity Impact',
        slug: 'transparency-in-donating-transforms-global-charity',
        excerpt: 'Explore how real-time audit trails and verification double donor confidence in non-profit platforms.',
        content: 'Financial transparency is the cornerstone of modern philanthropy. Donors deserve to know precisely how every dollar moves from initial pledge to ground-level execution...',
        author: 'Dr. Evelyn Vance',
        category: 'Insights',
        coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
        id: 'blog-2',
        title: 'Top 5 Emergency Relief Protocols for Rapid Medical Response',
        slug: 'top-5-emergency-relief-protocols-rapid-medical-response',
        excerpt: 'Behind the scenes of deploying solar power water purification and cardiac surgeries during crisis moments.',
        content: 'When disasters strike or sudden medical emergencies arise, speed and coordination are critical. Here is how FundRaise Pro partners mobilize emergency aid within 24 hours...',
        author: 'Marcus Vance',
        category: 'Field Operations',
        coverImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
        publishedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    }
];
exports.mockFAQs = [
    {
        id: 'faq-1',
        question: 'How are campaign funds verified and disbursed?',
        answer: 'Every campaign undergoes thorough identity & document verification before launch. Funds raised are securely transferred via automated bank transfers upon reaching milestones.',
        category: 'General',
    },
    {
        id: 'faq-2',
        question: 'Are donations tax deductible on FundRaise Pro?',
        answer: 'Yes! All contributions made to verified 501(c)(3) NGOs automatically generate official, downloadable tax receipts eligible for tax exemption.',
        category: 'Tax & Receipts',
    },
    {
        id: 'faq-3',
        question: 'What payment methods are supported?',
        answer: 'We support Stripe (Credit/Debit cards), Razorpay, UPI QR Instant Payments, and international direct transfers.',
        category: 'Donations & Payments',
    }
];
exports.mockPartners = [
    { id: 'part-1', name: 'Global Relief Corp', logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80', category: 'Platinum Partner' },
    { id: 'part-2', name: 'Aqua Pure International', logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80', category: 'Gold Sponsor' },
    { id: 'part-3', name: 'Tech Care Foundation', logo: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=300&q=80', category: 'Technology Alliance' },
];
const getBlogPosts = async (req, res) => (0, response_1.sendSuccess)(res, exports.mockBlogPosts);
exports.getBlogPosts = getBlogPosts;
const getFAQs = async (req, res) => (0, response_1.sendSuccess)(res, exports.mockFAQs);
exports.getFAQs = getFAQs;
const getPartners = async (req, res) => (0, response_1.sendSuccess)(res, exports.mockPartners);
exports.getPartners = getPartners;
//# sourceMappingURL=cmsController.js.map