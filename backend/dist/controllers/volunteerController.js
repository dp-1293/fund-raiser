"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignTask = exports.getVolunteerTasks = exports.getVolunteers = void 0;
const response_1 = require("../utils/response");
const store_1 = require("../services/store");
const getVolunteers = async (req, res) => {
    return (0, response_1.sendSuccess)(res, store_1.mockVolunteers, 'Volunteers list retrieved');
};
exports.getVolunteers = getVolunteers;
const getVolunteerTasks = async (req, res) => {
    return (0, response_1.sendSuccess)(res, store_1.mockVolunteerTasks, 'Volunteer tasks list retrieved');
};
exports.getVolunteerTasks = getVolunteerTasks;
const assignTask = async (req, res) => {
    const { taskId, volunteerName } = req.body;
    const task = store_1.mockVolunteerTasks.find(t => t.id === taskId);
    if (!task)
        return (0, response_1.sendError)(res, 'Task not found', 404);
    task.status = 'ASSIGNED';
    task.assignedVolunteerName = volunteerName;
    return (0, response_1.sendSuccess)(res, task, 'Task assigned successfully');
};
exports.assignTask = assignTask;
//# sourceMappingURL=volunteerController.js.map