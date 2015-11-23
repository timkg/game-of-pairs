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
    var gameId = action.gameId;
    var numberOfFlippedCards = state.getIn(["gamesById", gameId, "currentTurn", "flippedCardIds"]).size;

    if (numberOfFlippedCards === 0) {
      return flipCard(state, gameId, action.playerId, action.cardId);
    }

    if (numberOfFlippedCards === 1) {
      var flippedState = flipCard(state, gameId, action.playerId, action.cardId);
      var flippedCardIds = flippedState.getIn(["gamesById", gameId, "currentTurn", "flippedCardIds"]);

      var card1Id = flippedCardIds.get(0);
      var card2Id = flippedCardIds.get(1);

      if (isMatch(flippedState, gameId, flippedCardIds.get(0), flippedCardIds.get(1))) {
        var playerState = addCardsToPlayer(flippedState, gameId, flippedCardIds.get(0), flippedCardIds.get(1), action.playerId)
        var removedState = removeCardsFromGame(playerState, gameId, card1Id, card2Id);
        return grantNewTurnToActivePlayer(removedState, gameId);
      } else {
        return changePlayerTurn(flippedState, gameId, action.playerId);
      }
    }
    break;
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

function isMatch (state, gameId, card1Id, card2Id) {
  var flippedPhotoIds = state.getIn(["gamesById", gameId, "cards"]).toJS().
                          filter(function (card) {
                            return card.id === card1Id || card.id === card2Id;
                          }).
                          map(function (card) {
                            return card.photo.id;
                          });

  return flippedPhotoIds[0] === flippedPhotoIds[1];
}

function addCardsToPlayer (state, gameId, card1Id, card2Id, playerId) {
  var cards = state.getIn(["gamesById", gameId, "cards"]).toJS().
                 filter(function (card) {
                   return card.id === card1Id || card.id === card2Id;
                 });

  var players = state.getIn(["gamesById", gameId, "players"]).toJS();
  var player = players.filter(function (player) {
                 return player.id === playerId;
               })[0];

  if (!player.cards) {
    player.cards = [];
  }

  player.cards = player.cards.concat(cards);

  return state.setIn(["gamesById", gameId, "players"], Immutable.fromJS(players));
}

function removeCardsFromGame (state, gameId, card1Id, card2Id) {
  var card1Index = state.getIn(["gamesById", gameId, "cards"]).findIndex(function (card) {
    return card.get("id") === card1Id;
  });

  var card2Index = state.getIn(["gamesById", gameId, "cards"]).findIndex(function (card) {
    return card.get("id") === card2Id;
  });

  var newState1 = state.updateIn(["gamesById", gameId, "cards", card1Index], function (card) {
    return card.set("isRemoved", true);
  });
  var newState2 = newState1.updateIn(["gamesById", gameId, "cards", card2Index], function (card) {
    return card.set("isRemoved", true);
  });

  return newState2;
}

function grantNewTurnToActivePlayer (state, gameId) {
  return state.setIn(["gamesById", gameId, "currentTurn", "flippedCardIds"], Immutable.fromJS([]));
}

function changePlayerTurn (state, gameId, previousPlayerId) {
  var newPlayer = state.getIn(["gamesById", gameId, "players"]).toJS().
                      filter(function (player) {
                        return player.id !== previousPlayerId;
                      })[0];

  return state.setIn(["gamesById", gameId, "currentTurn"], Immutable.fromJS({
    activePlayer: newPlayer.id,
    flippedCardIds: []
  }));
}

module.exports = reducer;

/*
function setActivePlayer (state, gameId, playerId) {

}

function playerHasMovesLeft (state, gameId, playerId) {

}





function areCardsLeft (state, gameId) {

}

function declareWinner () {

}
*/
