import React, { Component } from "react";

export default class Lobby extends Component {
  isPLayerLoggedIn() {
    return this.props.player.name && this.props.player.id;
  }

  render() {
    return (
      <div className="lobby">
        <ul>
        {this.props.lobby.map((player) => {
          return <li key={player.id}>{player.name}</li>;
        })}
        </ul>
        {this.isPLayerLoggedIn() ? null : <Login {...this.props} />}
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
      <input type="text" onKeyDown={this.handleKeyDown.bind(this)} />
    );
  }
}
