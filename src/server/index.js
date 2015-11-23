require("dotenv").load();
var Server = require("socket.io");
var makeStore = require("./store");
var store = makeStore();
var express = require("express");
var app = express();

app.use(express.static("dist"));
app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/dist/index.html");
});

var HTTP_PORT = process.env.HTTP_PORT || 3000;
app.listen(HTTP_PORT, function () {
  console.log("Server listening on port %s", HTTP_PORT);
});

var WEBSOCKET_PORT = process.env.WEBSOCKET_PORT || 8090;
var io = new Server().attach(WEBSOCKET_PORT);

io.on("connection", function (socket) {

  store.subscribe(function () {
    socket.emit("state", store.getState().toJS());
  });

  socket.on("action", function (action) {
    store.dispatch(action);
  });

  socket.emit("state", store.getState().toJS());
});
