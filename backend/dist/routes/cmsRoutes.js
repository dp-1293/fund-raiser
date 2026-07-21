"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cmsController_1 = require("../controllers/cmsController");
const router = (0, express_1.Router)();
router.get('/blogs', cmsController_1.getBlogPosts);
router.get('/faqs', cmsController_1.getFAQs);
router.get('/partners', cmsController_1.getPartners);
exports.default = router;
//# sourceMappingURL=cmsRoutes.js.map