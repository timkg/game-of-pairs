import React, { Component } from "react";

export default class Lobby extends Component {
  isPLayerLoggedIn() {
    return this.props.player.name && this.props.player.id;
  }

  render() {
    return (
      <div className="lobby">
        <h1>Welcome to the Game of Pairs!</h1>
        {this.isPLayerLoggedIn() ? null : <Login {...this.props} />}
        <ul>
        {this.props.lobby.map((player) => {
          return <li key={player.id}>{player.name} is waiting for players!</li>;
        })}
        </ul>
      </div>
    );
  }
}

Lobby.defaultProps = { lobby: [], player: {} };

class Login extends Component {
  handleKeyDown(event) {
    if (event.which === 13) {
      this.props.login(event.target.value);
    }
  }

  render() {
    return (
      <input type="text" onKeyDown={this.handleKeyDown.bind(this)} placeholder="play as..." />
    );
  }
}
