import http from 'http';
import { Server } from 'socket.io'; 
import app from './src/app.js';
import { setupSocket } from './src/socket/socketHandler.js'; 

const PORT = process.env.PORT || 8080;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// 3. Setup the socket listeners
setupSocket(io);

// 4. IMPORTANT: Change app.listen to server.listen
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});