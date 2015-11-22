export default socket => store => next => action => {
  if (action.remote) {
    action.socketId = socket.id;
    socket.emit("action", action);
  }
  
  return next(action);
}
