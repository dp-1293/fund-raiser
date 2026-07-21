import { Request, Response } from 'express';
export declare const getVolunteers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getVolunteerTasks: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const assignTask: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
