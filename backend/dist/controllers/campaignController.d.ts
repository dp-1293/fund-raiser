import { Request, Response } from 'express';
export declare const getCampaigns: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCampaignBySlugOrId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const createCampaign: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getCategories: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
