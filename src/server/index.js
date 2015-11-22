require("dotenv").load();
var Server = require("socket.io");
var makeStore = require("./store");
var store = makeStore();

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
