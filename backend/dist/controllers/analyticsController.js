"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnalyticsOverview = void 0;
const response_1 = require("../utils/response");
const store_1 = require("../services/store");
const getAnalyticsOverview = async (req, res) => {
    const totalRaised = store_1.mockDonations.reduce((sum, d) => sum + d.amount, 0);
    const totalDonations = store_1.mockDonations.length;
    const totalUsers = store_1.mockUsers.length;
    const activeCampaigns = store_1.mockCampaigns.filter(c => c.status === 'ACTIVE').length;
    // Monthly revenue breakdown in INR
    const monthlyRevenue = [
        { month: 'Jan', amount: 1850000 },
        { month: 'Feb', amount: 2420000 },
        { month: 'Mar', amount: 3100000 },
        { month: 'Apr', amount: 2980000 },
        { month: 'May', amount: 4250000 },
        { month: 'Jun', amount: 5310000 },
        { month: 'Jul', amount: totalRaised > 20000000 ? Math.round(totalRaised * 0.35) : 4890000 },
    ];
    // Category breakdown
    const categoryStats = [
        { name: 'Medical', value: 1815000, count: 1274 },
        { name: 'Education', value: 1080000, count: 935 },
        { name: 'Children', value: 1025000, count: 1130 },
        { name: 'Women Empowerment', value: 930000, count: 1095 },
        { name: 'Community', value: 1465000, count: 1430 },
    ];
    // Top Donors
    const topDonors = [
        { name: 'Vikramaditya Bajaj', total: 250000, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
        { name: 'Tata Seva Trust', total: 184000, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
        { name: 'Priyanka Singhania', total: 125000, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
        { name: 'Rajesh Agarwal', total: 100000, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
    ];
    return (0, response_1.sendSuccess)(res, {
        metrics: {
            totalRaised,
            totalDonations,
            totalUsers,
            activeCampaigns,
        },
        monthlyRevenue,
        categoryStats,
        topDonors,
    }, 'Analytics overview retrieved');
};
exports.getAnalyticsOverview = getAnalyticsOverview;
//# sourceMappingURL=analyticsController.js.map