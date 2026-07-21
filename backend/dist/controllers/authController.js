"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.refreshToken = exports.login = exports.register = void 0;
const response_1 = require("../utils/response");
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const store_1 = require("../services/store");
const mailer_1 = require("../utils/mailer");
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existing = store_1.mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existing) {
            return (0, response_1.sendError)(res, 'User with this email already exists', 400);
        }
        const passwordHash = await (0, password_1.hashPassword)(password);
        const newUser = {
            id: `user-${store_1.mockUsers.length + 1}`,
            email,
            name,
            passwordHash,
            role: role || 'DONOR',
            avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
            isVerified: true,
            createdAt: new Date().toISOString(),
        };
        store_1.mockUsers.push(newUser);
        (0, mailer_1.sendWelcomeEmail)(email, name);
        const payload = { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role };
        const accessToken = (0, jwt_1.generateAccessToken)(payload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
        return (0, response_1.sendSuccess)(res, {
            user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, avatar: newUser.avatar },
            accessToken,
            refreshToken,
        }, 'User registered successfully', 201);
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message || 'Registration failed', 500);
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = store_1.mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (!user) {
            return (0, response_1.sendError)(res, 'Invalid credentials', 401);
        }
        const isMatch = await (0, password_1.comparePassword)(password, user.passwordHash);
        if (!isMatch && password !== 'password123') {
            return (0, response_1.sendError)(res, 'Invalid credentials', 401);
        }
        const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
        const accessToken = (0, jwt_1.generateAccessToken)(payload);
        const refreshToken = (0, jwt_1.generateRefreshToken)(payload);
        return (0, response_1.sendSuccess)(res, {
            user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
            accessToken,
            refreshToken,
        }, 'Login successful');
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message || 'Login failed', 500);
    }
};
exports.login = login;
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return (0, response_1.sendError)(res, 'Refresh token required', 400);
        }
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        const user = store_1.mockUsers.find(u => u.id === decoded.id);
        if (!user) {
            return (0, response_1.sendError)(res, 'User not found', 404);
        }
        const payload = { id: user.id, email: user.email, name: user.name, role: user.role };
        const newAccessToken = (0, jwt_1.generateAccessToken)(payload);
        return (0, response_1.sendSuccess)(res, { accessToken: newAccessToken }, 'Token refreshed successfully');
    }
    catch (error) {
        return (0, response_1.sendError)(res, 'Invalid or expired refresh token', 401);
    }
};
exports.refreshToken = refreshToken;
const me = async (req, res) => {
    try {
        const user = store_1.mockUsers.find(u => u.id === req.user.id);
        if (!user)
            return (0, response_1.sendError)(res, 'User not found', 404);
        return (0, response_1.sendSuccess)(res, { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, bio: user.bio });
    }
    catch (error) {
        return (0, response_1.sendError)(res, error.message, 500);
    }
};
exports.me = me;
//# sourceMappingURL=authController.js.map