// src/socket/socketHandler.js
const users = {};

export const setupSocket = (io) => {
  io.on("connection", (socket) => {
    // console.log("New connection:", socket.id);

    socket.on("join-project", ({ roomId, userName }) => {
      // 1. Leave previous rooms to avoid "ghost" connections
      const existingUser = users[socket.id];
      if (existingUser && existingUser.projectId !== roomId) {
        socket.leave(existingUser.projectId);
        socket.to(existingUser.projectId).emit("user-left", `${userName} moved to another room.`);
      }

      // 2. Join the new physical room
      socket.join(roomId);

      // 3. Store user data
      users[socket.id] = {
        username: userName,
        projectId: roomId,
        socketId: socket.id
      };

      // 4. Notify others in the room
      socket.to(roomId).emit("user-joined", {
        username: userName,
        message: `${userName} has joined!`
      });

      // 5. Update the list for EVERYONE in the room (including the sender)
      const roomUsers = Object.values(users).filter(u => u.projectId === roomId);
      io.to(roomId).emit("update-user-list", roomUsers);
    });

    socket.on("code-change", ({ projectId, code }) => {
      const clients = io.sockets.adapter.rooms.get(projectId);
      const numClients = clients ? clients.size : 0;
      
      // DEBUG: If this says "Users in room: 1", the other person never successfully "joined"
      console.log(`Relaying code for room ${projectId}. Users in room: ${numClients}`);

      socket.to(projectId).emit("receive-code", code);
    });

    socket.on("disconnect", () => {
      if (users[socket.id]) {
        const { projectId, username } = users[socket.id];
        delete users[socket.id];

        // Notify others and refresh their lists
        socket.to(projectId).emit("user-left", `${username} left.`);
        const remainingUsers = Object.values(users).filter(u => u.projectId === projectId);
        io.to(projectId).emit("update-user-list", remainingUsers);
      }
    });
  }); // End of io.on("connection")
};