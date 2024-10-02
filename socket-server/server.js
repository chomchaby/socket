import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["POST"],
    credentials: true,
  },
});

io.on("connection", (client) => {
  console.log("user connected");

  client.on("disconnect", () => {
    console.log("user disconnected");
  });

  client.on("sent-message", function (message) {
    console.log(message);
  });

  // every second request
  client.on("greeting", function (message) {
    console.log(message);
  });
});

const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`Server is listening on http://${HOST}:${PORT}`);
});
export default server;
