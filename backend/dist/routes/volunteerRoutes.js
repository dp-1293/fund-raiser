"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const volunteerController_1 = require("../controllers/volunteerController");
const router = (0, express_1.Router)();
router.get('/', volunteerController_1.getVolunteers);
router.get('/tasks', volunteerController_1.getVolunteerTasks);
router.post('/tasks/assign', volunteerController_1.assignTask);
exports.default = router;
//# sourceMappingURL=volunteerRoutes.js.map