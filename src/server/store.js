var createStore = require("redux").createStore;
var reducer = require("./reducer");

module.exports = function makeStore () {
  return createStore(reducer);
}
