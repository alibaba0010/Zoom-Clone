import { createServer } from "http";
import app from "./app.js";
import { Server } from "socket.io";
const server = createServer(app);
const PORT = 3005;

const io = new Server(server);
io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
  }); 
  });
});
server.listen(PORT, () =>
  console.log(`Server listening at port http://localhost:${PORT}`)
);
