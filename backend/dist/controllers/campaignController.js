"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.createCampaign = exports.getCampaignBySlugOrId = exports.getCampaigns = void 0;
const response_1 = require("../utils/response");
const store_1 = require("../services/store");
const getCampaigns = async (req, res) => {
    try {
        const { category, search, sort, status, featured, urgent } = req.query;
        let filtered = [...store_1.mockCampaigns];
        if (category) {
            filtered = filtered.filter(c => c.categoryId === category || c.categoryName.toLowerCase() === category.toLowerCase());
        }
        if (search) {
            const q = search.toLowerCase();
            filtered = filtered.filter(c => c.title.toLowerCase().includes(q) || c.summary.toLowerCase().includes(q));
        }
        if (status) {
            filtered = filtered.filter(c => c.status === status);
        }
        if (featured === 'true') {
            filtered = filtered.filter(c => c.isFeatured);
        }
        if (urgent === 'true') {
            filtered = filtered.filter(c => c.isUrgent);
        }
        if (sort === 'most_funded') {
            filtered.sort((a, b) => b.raisedAmount - a.raisedAmount);
        }
        else if (sort === 'ending_soon') {
            filtered.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
        }
        else if (sort === 'newest') {
            filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        }
        return (0, response_1.sendSuccess)(res, filtered, 'Campaigns retrieved successfully', 200, { total: filtered.length });
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message || 'Failed to fetch campaigns', 500);
    }
};
exports.getCampaigns = getCampaigns;
const getCampaignBySlugOrId = async (req, res) => {
    try {
        const { slugOrId } = req.params;
        const campaign = store_1.mockCampaigns.find(c => c.id === slugOrId || c.slug === slugOrId);
        if (!campaign) {
            return (0, response_1.sendError)(res, 'Campaign not found', 404);
        }
        return (0, response_1.sendSuccess)(res, campaign, 'Campaign details retrieved');
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 500);
    }
};
exports.getCampaignBySlugOrId = getCampaignBySlugOrId;
const createCampaign = async (req, res) => {
    try {
        const { title, summary, story, targetAmount, categoryId, featuredImage, location } = req.body;
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const cat = store_1.mockCategories.find(c => c.id === categoryId) || store_1.mockCategories[0];
        const newCampaign = {
            id: `camp-${store_1.mockCampaigns.length + 1}`,
            title,
            slug,
            summary,
            story,
            targetAmount: parseFloat(targetAmount),
            raisedAmount: 0,
            currency: 'USD',
            categoryId: cat.id,
            categoryName: cat.name,
            status: 'APPROVED', // auto approved for demo
            isFeatured: false,
            isUrgent: false,
            featuredImage: featuredImage || 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb0?auto=format&fit=crop&w=1200&q=80',
            organizerId: req.user.id,
            organizerName: req.user.name,
            endDate: new Date(Date.now() + 30 * 86400000).toISOString(),
            location: location || 'Global Community',
            donationsCount: 0,
            createdAt: new Date().toISOString(),
        };
        store_1.mockCampaigns.unshift(newCampaign);
        return (0, response_1.sendSuccess)(res, newCampaign, 'Campaign created successfully', 201);
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 500);
    }
};
exports.createCampaign = createCampaign;
const getCategories = async (req, res) => {
    return (0, response_1.sendSuccess)(res, store_1.mockCategories, 'Categories retrieved');
};
exports.getCategories = getCategories;
//# sourceMappingURL=campaignController.js.map