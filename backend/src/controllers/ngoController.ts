import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { mockNGOs } from '../services/store';

export const getNGOs = async (req: Request, res: Response) => {
  return sendSuccess(res, mockNGOs, 'NGO directory retrieved');
};

export const verifyNGO = async (req: Request, res: Response) => {
  const { id } = req.params;
  const ngo = mockNGOs.find(n => n.id === id);
  if (!ngo) return sendError(res, 'NGO profile not found', 404);
  ngo.isVerified = true;
  return sendSuccess(res, ngo, 'NGO verified successfully');
};
