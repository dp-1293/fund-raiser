import { PrismaClient } from '@prisma/client';
export declare const prisma: PrismaClient<{
    log: ("warn" | "error")[];
}, never, import("@prisma/client/runtime/library").DefaultArgs>;
export declare const mockCategories: {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
}[];
export declare const mockUsers: any[];
export declare const mockNGOs: {
    id: string;
    userId: string;
    orgName: string;
    registrationNumber: string;
    taxId: string;
    address: string;
    phone: string;
    website: string;
    isVerified: boolean;
}[];
export declare const mockCampaigns: any[];
export declare const mockDonations: any[];
export declare const mockVolunteers: {
    id: string;
    userId: string;
    name: string;
    email: string;
    skills: string[];
    availability: string;
    city: string;
    totalHours: number;
    badge: string;
}[];
export declare const mockVolunteerTasks: {
    id: string;
    campaignId: string;
    title: string;
    description: string;
    status: string;
    assignedVolunteerName: string;
    hoursLogged: number;
}[];
