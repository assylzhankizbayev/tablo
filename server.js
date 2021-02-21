const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});
const fs = require("fs");
const path = require("path");
const PORT = 8080;
let regIdx = 0;
let calIdx = 0;

io.on("connection", (socket) => {
  console.log(`Connected User, ID: ${socket.id}`);
  socket.emit('init', { regIdx, calIdx })

  socket.on("registration", (queue) => {
    regIdx++;
    console.log('Registered new user', regIdx);
    socket.broadcast.emit("registered-users-amount", { amount: regIdx });
  });

  socket.on("call-next-user", (queue) => {
    calIdx++;
    console.log('Call user', calIdx);
    socket.broadcast.emit("user-info", { id: calIdx });
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
