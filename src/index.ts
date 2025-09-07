import { Server } from "socket.io";

const io = new Server({cors: {origin: process.env.CORS_ORIGIN }});

function countInRoom(roomId: string) {
  return io.of("/").adapter.rooms.get(roomId)?.size || 0;
}

io.on("connection", function (socket) {
  socket.on("join-room", ({ roomId }: { roomId: string }) => {
    console.log("A user Join in room:", roomId);

    socket.join(roomId);

    socket.on("message", (msg) => {
      const shapes = msg;
      console.log("Message from Client:", shapes);
      socket.broadcast.in(roomId).emit("message", shapes);
    });

    socket.on("mouse", (msg: { x: number; y: number }) => {
      socket.broadcast.in(roomId).emit("mouse", msg);
    });

    socket.on("delete-shape", (msg: { id: string }) => {
      socket.broadcast.in(roomId).emit("delete-shape", msg);
    });

    socket.on("remove-all-shapes", () => {
      socket.broadcast.in(roomId).emit("remove-all-shapes");
    });

    socket.on("update-shape", (msg: Shape) => {
      socket.broadcast.in(roomId).emit("update-shape", msg);
    })

    // send the total clients connected to the room
    io.emit("total-client", countInRoom(roomId));

    // update total client
    io.on("update-total-client", () => {
      io.emit("total-client", countInRoom(roomId));
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected from room:", roomId);
      io.emit("total-client", countInRoom(roomId));
    });
  });
});

const port = process.env.PORT || 8081;
io.listen(port as number);
