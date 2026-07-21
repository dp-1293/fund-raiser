import { Request, Response } from 'express';
import { sendSuccess, sendError } from '../utils/response';
import { mockVolunteers, mockVolunteerTasks } from '../services/store';

export const getVolunteers = async (req: Request, res: Response) => {
  return sendSuccess(res, mockVolunteers, 'Volunteers list retrieved');
};

export const getVolunteerTasks = async (req: Request, res: Response) => {
  return sendSuccess(res, mockVolunteerTasks, 'Volunteer tasks list retrieved');
};

export const assignTask = async (req: Request, res: Response) => {
  const { taskId, volunteerName } = req.body;
  const task = mockVolunteerTasks.find(t => t.id === taskId);
  if (!task) return sendError(res, 'Task not found', 404);
  task.status = 'ASSIGNED';
  task.assignedVolunteerName = volunteerName;
  return sendSuccess(res, task, 'Task assigned successfully');
};
