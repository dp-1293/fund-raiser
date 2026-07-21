import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

let io: SocketIOServer | null = null;

export const initSocket = (server: HttpServer): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('⚡ Socket client connected:', socket.id);

    socket.on('join_campaign', (campaignId: string) => {
      socket.join(`campaign_${campaignId}`);
      console.log(`Socket ${socket.id} joined campaign_${campaignId}`);
    });

    socket.on('disconnect', () => {
      console.log('Socket client disconnected:', socket.id);
    });
  });

  return io;
};

export const getIO = (): SocketIOServer => {
  if (!io) {
    throw new Error('Socket.IO not initialized');
  }
  return io;
};

export const emitNewDonation = (donationData: any) => {
  if (io) {
    io.emit('new_donation_live', donationData);
    io.to(`campaign_${donationData.campaignId}`).emit('campaign_donation_received', donationData);
  }
};
