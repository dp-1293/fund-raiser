"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/', auth_1.requireAuth, (0, auth_1.requireRole)(['SUPER_ADMIN', 'ADMIN']), userController_1.getUsers);
router.patch('/:id/role', auth_1.requireAuth, (0, auth_1.requireRole)(['SUPER_ADMIN']), userController_1.updateUserRole);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map