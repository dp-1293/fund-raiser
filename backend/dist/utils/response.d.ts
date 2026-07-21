import { Response } from 'express';
export declare const sendSuccess: <T>(res: Response, data: T, message?: string, statusCode?: number, meta?: any) => Response;
export declare const sendError: (res: Response, message?: string, statusCode?: number, errors?: any) => Response;
