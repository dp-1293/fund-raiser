export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'CAMPAIGN_MANAGER' | 'NGO' | 'VOLUNTEER' | 'DONOR' | 'GUEST';

export type CampaignStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  avatar?: string;
  isVerified?: boolean;
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  summary: string;
  story: string;
  targetAmount: number;
  raisedAmount: number;
  currency: string;
  categoryId: string;
  categoryName: string;
  status: CampaignStatus;
  isFeatured: boolean;
  isUrgent: boolean;
  featuredImage: string;
  gallery?: string[];
  videoUrl?: string;
  organizerId: string;
  organizerName: string;
  endDate: string;
  location?: string;
  donationsCount: number;
  createdAt: string;
}

export interface Donation {
  id: string;
  campaignId: string;
  campaignTitle: string;
  donorId?: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  isAnonymous: boolean;
  isRecurring: boolean;
  paymentGateway: 'STRIPE' | 'RAZORPAY' | 'UPI';
  transactionId: string;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
  dedicationMessage?: string;
  receiptNumber?: string;
  createdAt: string;
}

export interface NGOProfile {
  id: string;
  userId: string;
  orgName: string;
  registrationNumber: string;
  taxId?: string;
  address?: string;
  phone?: string;
  website?: string;
  isVerified: boolean;
}

export interface Volunteer {
  id: string;
  userId: string;
  name: string;
  email: string;
  skills: string[];
  availability: string;
  city: string;
  totalHours: number;
  badge: string;
}

export interface VolunteerTask {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  status: 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED';
  assignedVolunteerName?: string;
  hoursLogged: number;
}
