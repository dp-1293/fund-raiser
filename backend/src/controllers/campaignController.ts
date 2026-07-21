import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { mockCampaigns, mockCategories, mockUsers } from '../services/store';

export const getCampaigns = async (req: Request, res: Response) => {
  try {
    const { category, search, sort, status, featured, urgent } = req.query;

    let filtered = [...mockCampaigns];

    if (category) {
      filtered = filtered.filter(c => c.categoryId === category || c.categoryName.toLowerCase() === (category as string).toLowerCase());
    }

    if (search) {
      const q = (search as string).toLowerCase();
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
    } else if (sort === 'ending_soon') {
      filtered.sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime());
    } else if (sort === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return sendSuccess(res, filtered, 'Campaigns retrieved successfully', 200, { total: filtered.length });
  } catch (error: any) {
    return sendError(res, error.message || 'Failed to fetch campaigns', 500);
  }
};

export const getCampaignBySlugOrId = async (req: Request, res: Response) => {
  try {
    const { slugOrId } = req.params;
    const campaign = mockCampaigns.find(c => c.id === slugOrId || c.slug === slugOrId);

    if (!campaign) {
      return sendError(res, 'Campaign not found', 404);
    }

    return sendSuccess(res, campaign, 'Campaign details retrieved');
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

export const createCampaign = async (req: any, res: Response) => {
  try {
    const { title, summary, story, targetAmount, categoryId, featuredImage, location } = req.body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const cat = mockCategories.find(c => c.id === categoryId) || mockCategories[0];

    const newCampaign = {
      id: `camp-${mockCampaigns.length + 1}`,
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

    mockCampaigns.unshift(newCampaign);
    return sendSuccess(res, newCampaign, 'Campaign created successfully', 201);
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

export const getCategories = async (req: Request, res: Response) => {
  return sendSuccess(res, mockCategories, 'Categories retrieved');
};
