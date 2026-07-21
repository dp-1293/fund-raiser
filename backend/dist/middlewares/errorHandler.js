"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_1 = require("../utils/response");
const errorHandler = (err, req, res, next) => {
    console.error('Unhandled Server Error:', err);
    const message = err.message || 'Internal server error';
    const status = err.statusCode || err.status || 500;
    return (0, response_1.sendError)(res, message, status, process.env.NODE_ENV === 'development' ? err.stack : undefined);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map