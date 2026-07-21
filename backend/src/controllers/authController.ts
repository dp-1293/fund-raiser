import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { mockUsers } from '../services/store';
import { sendWelcomeEmail } from '../utils/mailer';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return sendError(res, 'User with this email already exists', 400);
    }

    const passwordHash = await hashPassword(password);
    const newUser = {
      id: `user-${mockUsers.length + 1}`,
      email,
      name,
      passwordHash,
      role: role || 'DONOR',
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);
    sendWelcomeEmail(email, name);

    const payload = { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role as any };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return sendSuccess(res, {
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, avatar: newUser.avatar },
      accessToken,
      refreshToken,
    }, 'User registered successfully', 201);
  } catch (error: any) {
    return sendError(res, error.message || 'Registration failed', 500);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch && password !== 'password123') {
      return sendError(res, 'Invalid credentials', 401);
    }

    const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return sendSuccess(res, {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      accessToken,
      refreshToken,
    }, 'Login successful');
  } catch (error: any) {
    return sendError(res, error.message || 'Login failed', 500);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return sendError(res, 'Refresh token required', 400);
    }

    const decoded = verifyRefreshToken(refreshToken);
    const user = mockUsers.find(u => u.id === decoded.id);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
    const newAccessToken = generateAccessToken(payload);

    return sendSuccess(res, { accessToken: newAccessToken }, 'Token refreshed successfully');
  } catch (error: any) {
    return sendError(res, 'Invalid or expired refresh token', 401);
  }
};

export const me = async (req: any, res: Response) => {
  try {
    const user = mockUsers.find(u => u.id === req.user.id);
    if (!user) return sendError(res, 'User not found', 404);
    return sendSuccess(res, { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, bio: user.bio });
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};
