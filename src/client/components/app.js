import React, { Component } from "react";
import Game from "./game";
import Lobby from "./lobby";
import { connect } from "react-redux";
import * as actionCreators from "../actions";

export class App extends Component {
  render() {
    return (
      <div>
        <Game flip={this.props.flip} player={this.props.player} {...this.props.game} />
        <Lobby {...this.props} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const props = {};

  if (state.get("player")) {
    props.player = state.get("player").toJS();
  }

  if (state.get("lobby")) {
    props.lobby = state.get("lobby").toJS();
  }

  if (state.get("game")) {
    props.game = state.get("game").toJS();
  }

  return props;
}

export const AppContainer = connect(mapStateToProps, actionCreators)(App);
