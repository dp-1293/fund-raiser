import { UserPayload } from '../types';
export declare const generateAccessToken: (payload: UserPayload) => string;
export declare const generateRefreshToken: (payload: UserPayload) => string;
export declare const verifyAccessToken: (token: string) => UserPayload;
export declare const verifyRefreshToken: (token: string) => UserPayload;
