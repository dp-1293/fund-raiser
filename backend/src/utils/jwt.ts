import jwt from 'jsonwebtoken';
import { config } from '../config';
import { UserPayload } from '../types';

export const generateAccessToken = (payload: UserPayload): string => {
  return jwt.sign(payload, config.jwt.secret, { expiresIn: '1d' });
};

export const generateRefreshToken = (payload: UserPayload): string => {
  return jwt.sign(payload, config.jwt.refreshSecret, { expiresIn: '7d' });
};

export const verifyAccessToken = (token: string): UserPayload => {
  return jwt.verify(token, config.jwt.secret) as UserPayload;
};

export const verifyRefreshToken = (token: string): UserPayload => {
  return jwt.verify(token, config.jwt.refreshSecret) as UserPayload;
};
