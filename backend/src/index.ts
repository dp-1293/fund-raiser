import http from 'http';
import app from './app';
import { config } from './config';
import { initSocket } from './socket';

const server = http.createServer(app);

// Initialize Socket.IO engine
initSocket(server);

server.listen(config.port, () => {
  console.log(`
  🚀 FundRaise Pro Backend API Server Running!
  -------------------------------------------
  🔊 Environment: ${config.env}
  🌐 Listening on: http://localhost:${config.port}
  ⚡ Socket.IO Ready: http://localhost:${config.port}/socket.io/
  -------------------------------------------
  `);
});
