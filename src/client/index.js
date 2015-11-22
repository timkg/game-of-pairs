import { AppContainer } from "./components/app";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import io from "socket.io-client";
import middleware from "./middleware";

const socket = io(`${location.protocol}//${location.hostname}:8090`);
const createStoreWithMiddleware = applyMiddleware(middleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);

socket.on("connect", () => {
  console.log("connected with id %s", socket.id)
});

socket.on("state", (state) => {
  console.log("received state from server", state);
  store.dispatch({ type: "SET_LOBBY", lobby: state.lobby });

  const currentGame = Object.keys(state.gamesById).
                        filter((gameId) => !!gameId.match(socket.id)).
                        map((gameId) => state.gamesById[gameId])[0];

  if (currentGame) {
    store.dispatch({ type: "SET_GAME", game: currentGame });
  }
});

store.subscribe(() => {
  console.log("client store updated", store.getState().toJS());
});

const target = document.createElement("div");
document.body.appendChild(target);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  target
);
