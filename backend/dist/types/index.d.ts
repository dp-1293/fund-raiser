import { Request } from 'express';
export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'CAMPAIGN_MANAGER' | 'NGO' | 'VOLUNTEER' | 'DONOR' | 'GUEST';
export type CampaignStatus = 'DRAFT' | 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED';
export interface UserPayload {
    id: string;
    email: string;
    name: string;
    role: Role;
}
export interface AuthenticatedRequest extends Request {
    user?: UserPayload;
}
export interface ApiResponse<T = any> {
    success: boolean;
    message?: string;
    data?: T;
    meta?: {
        total?: number;
        page?: number;
        limit?: number;
        totalPages?: number;
    };
    errors?: any;
}
