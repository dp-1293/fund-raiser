"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emitNewDonation = exports.getIO = exports.initSocket = void 0;
const socket_io_1 = require("socket.io");
let io = null;
const initSocket = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });
    io.on('connection', (socket) => {
        console.log('⚡ Socket client connected:', socket.id);
        socket.on('join_campaign', (campaignId) => {
            socket.join(`campaign_${campaignId}`);
            console.log(`Socket ${socket.id} joined campaign_${campaignId}`);
        });
        socket.on('disconnect', () => {
            console.log('Socket client disconnected:', socket.id);
        });
    });
    return io;
};
exports.initSocket = initSocket;
const getIO = () => {
    if (!io) {
        throw new Error('Socket.IO not initialized');
    }
    return io;
};
exports.getIO = getIO;
const emitNewDonation = (donationData) => {
    if (io) {
        io.emit('new_donation_live', donationData);
        io.to(`campaign_${donationData.campaignId}`).emit('campaign_donation_received', donationData);
    }
};
exports.emitNewDonation = emitNewDonation;
//# sourceMappingURL=socket.js.map