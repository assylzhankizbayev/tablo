const socket = io.connect("http://localhost:8080", { reconnect: true });

socket.on("connect", () => {
  console.log("connect", socket.id);

  // setInterval(() => {
  //   socket.emit("queue", "hello");
  // }, 2500);
});

socket.on("userInfo", ({ id, room }) => {
  console.log('got id and room', id, room);
  const header = document.querySelector('.header');
  header.textContent = id + " - " + room;
});

socket.on("disconnect", () => {
  console.log("disconnect", socket.id);
});
