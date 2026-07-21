import { Request, Response } from 'express';
export declare const getNGOs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const verifyNGO: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
