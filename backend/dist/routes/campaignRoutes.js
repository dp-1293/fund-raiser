"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaignController_1 = require("../controllers/campaignController");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/categories', campaignController_1.getCategories);
router.get('/', campaignController_1.getCampaigns);
router.get('/:slugOrId', campaignController_1.getCampaignBySlugOrId);
router.post('/', auth_1.requireAuth, campaignController_1.createCampaign);
exports.default = router;
//# sourceMappingURL=campaignRoutes.js.map