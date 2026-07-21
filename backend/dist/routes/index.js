"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const campaignRoutes_1 = __importDefault(require("./campaignRoutes"));
const donationRoutes_1 = __importDefault(require("./donationRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const ngoRoutes_1 = __importDefault(require("./ngoRoutes"));
const volunteerRoutes_1 = __importDefault(require("./volunteerRoutes"));
const analyticsRoutes_1 = __importDefault(require("./analyticsRoutes"));
const cmsRoutes_1 = __importDefault(require("./cmsRoutes"));
const router = (0, express_1.Router)();
router.use('/auth', authRoutes_1.default);
router.use('/campaigns', campaignRoutes_1.default);
router.use('/donations', donationRoutes_1.default);
router.use('/users', userRoutes_1.default);
router.use('/ngos', ngoRoutes_1.default);
router.use('/volunteers', volunteerRoutes_1.default);
router.use('/analytics', analyticsRoutes_1.default);
router.use('/cms', cmsRoutes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map