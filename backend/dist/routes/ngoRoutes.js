"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ngoController_1 = require("../controllers/ngoController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/', ngoController_1.getNGOs);
router.patch('/:id/verify', auth_1.requireAuth, (0, auth_1.requireRole)(['SUPER_ADMIN', 'ADMIN']), ngoController_1.verifyNGO);
exports.default = router;
//# sourceMappingURL=ngoRoutes.js.map