"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserRole = exports.getUsers = void 0;
const response_1 = require("../utils/response");
const store_1 = require("../services/store");
const getUsers = async (req, res) => {
    try {
        const safeUsers = store_1.mockUsers.map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            avatar: u.avatar,
            isVerified: u.isVerified,
            createdAt: u.createdAt,
        }));
        return (0, response_1.sendSuccess)(res, safeUsers, 'Users list retrieved');
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 500);
    }
};
exports.getUsers = getUsers;
const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        const user = store_1.mockUsers.find(u => u.id === id);
        if (!user)
            return (0, response_1.sendError)(res, 'User not found', 404);
        user.role = role;
        return (0, response_1.sendSuccess)(res, { id: user.id, role: user.role }, 'User role updated');
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 500);
    }
};
exports.updateUserRole = updateUserRole;
//# sourceMappingURL=userController.js.map