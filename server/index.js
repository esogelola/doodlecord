require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
var cors = require("cors");

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
app.use(cors());
const SERVER_PORT = process.env.SERVER_PORT || 80;

const socketManage = require("./manage")(io);
io.on("connection", socketManage);

const path = require("path");
app.use(express.static(path.join(__dirname, "../build")));

server.listen({ port: SERVER_PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}`)
);
