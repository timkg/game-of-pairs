export function login (name) {
  return {
    type: "LOGIN",
    remote: true,
    name: name
  };
}

export function flip (gameId, playerId, cardId) {
  return {
    type: "FLIP_CARD",
    remote: true,
    cardId: cardId,
    gameId: gameId,
    playerId: playerId
  };
}

export function endTurn (gameId, playerId) {
  return {
    type: "END_TURN",
    remote: true,
    gameId: gameId,
    playerId: playerId
  };
}
