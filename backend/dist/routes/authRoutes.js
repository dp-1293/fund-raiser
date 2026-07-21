"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middlewares/auth");
const rateLimiter_1 = require("../middlewares/rateLimiter");
const router = (0, express_1.Router)();
router.post('/register', rateLimiter_1.authRateLimiter, authController_1.register);
router.post('/login', rateLimiter_1.authRateLimiter, authController_1.login);
router.post('/refresh-token', authController_1.refreshToken);
router.get('/me', auth_1.requireAuth, authController_1.me);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map