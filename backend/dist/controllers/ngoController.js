"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyNGO = exports.getNGOs = void 0;
const response_1 = require("../utils/response");
const store_1 = require("../services/store");
const getNGOs = async (req, res) => {
    return (0, response_1.sendSuccess)(res, store_1.mockNGOs, 'NGO directory retrieved');
};
exports.getNGOs = getNGOs;
const verifyNGO = async (req, res) => {
    const { id } = req.params;
    const ngo = store_1.mockNGOs.find(n => n.id === id);
    if (!ngo)
        return (0, response_1.sendError)(res, 'NGO profile not found', 404);
    ngo.isVerified = true;
    return (0, response_1.sendSuccess)(res, ngo, 'NGO verified successfully');
};
exports.verifyNGO = verifyNGO;
//# sourceMappingURL=ngoController.js.map