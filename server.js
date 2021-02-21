const httpServer = require("http").createServer(handler);
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});
const fs = require("fs");
const path = require("path");
const PORT = 8080;

let id = 0;

io.on("connection", (socket) => {
  console.log(`Connected User, ID: ${socket.id}`);

  socket.on("queue", (queue) => {
    id++;
    console.log('New queue from user', id);
    socket.broadcast.emit("userInfo", { id, room: 101 });
  });
});


httpServer.listen(PORT, () =>
  console.log(`listening on http://localhost:${PORT}`)
);


function handler(req, res) {
  fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}
