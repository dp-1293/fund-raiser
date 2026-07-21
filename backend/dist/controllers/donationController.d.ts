import { Request, Response } from 'express';
export declare const createDonation: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getDonationsByCampaign: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getUserDonations: (req: any, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const downloadTaxReceiptPDF: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
