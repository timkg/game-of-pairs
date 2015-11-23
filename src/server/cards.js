var photos = require("../../photos.json").photos;

var cards = photos.items.slice(0, 5).
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

module.exports = cards;
