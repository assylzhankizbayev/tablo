const express = require("express");
const app = express();
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, {
  cors: { origin: "*" },
});
const PORT = 8080;

app.get("/", (req, res) => {
  res.json("OK");
});

let regIdx = 0;
let calIdx = 0;
const displayUsersList = [];
const displayUsersListLength = 8;

io.on("connection", (socket) => {
  console.log(`Connected User, ID: ${socket.id}`);
  socket.emit("init", { regIdx, calIdx, displayUsersListLength, displayUsersList });

  socket.on("registration", (queue) => {
    regIdx++;
    console.log("Registered new user", regIdx);
    socket.emit("registered-users-amount", { amount: regIdx });
  });

  socket.on("call-next-user", (queue) => {
    calIdx++;

    if (displayUsersList.length >= displayUsersListLength) {
      displayUsersList.pop();
    }

    displayUsersList.unshift(calIdx);

    console.log("Call user", calIdx, 'Display users list', displayUsersList);
    socket.broadcast.emit("user-info", { id: calIdx });
  });
});

httpServer.listen(PORT, () =>
  console.log(`listening on http://localhost:${PORT}`)
);
