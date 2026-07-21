import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
export declare const initSocket: (server: HttpServer) => SocketIOServer;
export declare const getIO: () => SocketIOServer;
export declare const emitNewDonation: (donationData: any) => void;
