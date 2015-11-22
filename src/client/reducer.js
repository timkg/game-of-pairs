import { fromJS } from "immutable";

const DEFAULT_STATE = fromJS({});

export default function reducer (state=DEFAULT_STATE, action) {
  console.log("client store received action", action);

  switch (action.type) {
  case "LOGIN":
    return state.set("player", fromJS({ name: action.name, id: action.socketId }));
  case "SET_LOBBY":
    return state.set("lobby", fromJS(action.lobby));
  case "SET_GAME":
    return state.set("game", fromJS(action.game));
  case "FLIP_CARD":
    const flippedCards = state.getIn(["game", "currentTurn", "flippedCards"]);
    return state.setIn(["game", "currentTurn", "flippedCards"], flippedCards.push(action.cardId));
  default:
    return state;
  }
}
