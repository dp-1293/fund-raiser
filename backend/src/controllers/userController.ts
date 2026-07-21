import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { mockUsers } from '../services/store';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const safeUsers = mockUsers.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role: u.role,
      avatar: u.avatar,
      isVerified: u.isVerified,
      createdAt: u.createdAt,
    }));
    return sendSuccess(res, safeUsers, 'Users list retrieved');
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};

export const updateUserRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = mockUsers.find(u => u.id === id);
    if (!user) return sendError(res, 'User not found', 404);

    user.role = role;
    return sendSuccess(res, { id: user.id, role: user.role }, 'User role updated');
  } catch (error: any) {
    return sendError(res, error.message, 500);
  }
};
