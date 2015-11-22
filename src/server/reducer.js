var Immutable = require("immutable");
var photos = require("../../photos.json").photos;
var cards = photos.items.
              map(function (photo) {
                return [{photo: photo}, {photo: photo}];
              }).
              reduce(function (acc, curr) {
                return acc.concat(curr);
              }, []).
              map(function (card, index) {
                card.id = "card-" + index;
                return card;
              });

var DEFAULT_STATE = Immutable.fromJS({
  lobby: [],
  gamesById: {},
  cards: cards
});

function reducer (state, action) {
  if (!state) {
    state = DEFAULT_STATE;
  }
  switch (action.type) {
  case "LOGIN":
    return addPlayer(state, action.name, action.socketId);
  case "FLIP_CARD":
    return flipCard(state, action.gameId, action.playerId, action.cardId);
  default:
    return state;
  }
}

function addPlayer (state, playerName, playerId) {
  if (state.get("lobby").size > 0) {
    var waitingPlayer = state.get("lobby").first();
    return startGame(state.setIn(["lobby"], state.get("lobby").shift()), waitingPlayer, { name: playerName, id: playerId });
  }

  return state.setIn(["lobby"], state.get("lobby").push({ name: playerName, id: playerId }));
}

function startGame (state, player1, player2) {
  var newGame = Immutable.fromJS({
    id: player1.id + "-" + player2.id,
    players: [player1, player2],
    cards: state.get("cards"),
    currentTurn: {
      activePlayer: player1.id,
      flippedCardIds: []
    }
  });

  return state.setIn(["gamesById", newGame.get("id")], newGame);
}

function flipCard (state, gameId, playerId, cardId) {
  var game = state.getIn(["gamesById", gameId]);

  if (!game) {
    console.error("received invalid action, game %s not active in current state", gameId);
    console.log(state.toJS());
  }

  var flippedCardIds = game.getIn(["currentTurn", "flippedCardIds"]);
  return state.setIn(["gamesById", gameId, "currentTurn", "flippedCardIds"], flippedCardIds.push(cardId));
}

module.exports = reducer;

/*
function setActivePlayer (state, gameId, playerId) {

}

function playerHasMovesLeft (state, gameId, playerId) {

}

function isMatch (state, gameId, card1Id, card2Id) {

}

function removeCardsFromGame (state, gameId, card1Id, card2Id) {

}

function addCardsToPlayer (state, gameId, card1Id, card2Id, playerId) {

}

function areCardsLeft (state, gameId) {

}

function declareWinner () {

}
*/
