import React, { Component } from "react";

const FLIPPED_CARD_VISIBILITY_DURATION = 1000;

export default class Game extends Component {
  isPlayersTurn() {
    return this.props.game.currentTurn.activePlayer === this.props.player.id;
  }

  isCardFlipped(cardId) {
    return this.props.game.currentTurn.flippedCardIds.indexOf(cardId) >= 0;
  }

  handleCardClick(card) {
    if (this.isPlayersTurn() && this.props.game.currentTurn.flippedCardIds.length === 1) {
      setTimeout(function () {
        this.props.endTurn(this.props.game.id, this.props.player.id);
      }.bind(this), FLIPPED_CARD_VISIBILITY_DURATION);
    }

    if (this.isPlayersTurn()) {
      this.props.flip(this.props.game.id, this.props.player.id, card.id);
    } else {
      alert("Please wait for your turn!");
    }
  }

  render() {
    const { id, currentTurn, cards } = this.props.game;

    return (
      <div className="game">
        <div className="player-cards">
          <h2>{this.props.player.name}</h2>
          {this.props.player.cards.map((card) => {
            return <div className="card--won"><img src={card.photo.thumbUrl} /></div>;
          })}
        </div>
        <div className="cards">

        <header className="turn-info">
          {this.isPlayersTurn() ? <p>Your turn!</p> : <p>Please wait for your turn.</p>}
        </header>

        {cards.map((card) => {
          const isFlipped = this.isCardFlipped(card.id);
          const onClick = this.handleCardClick.bind(this, card);

          return <Card key={card.id} onClick={onClick} isFlipped={isFlipped} {...card} />;
        })}
        </div>
        <div className="opponent-cards">
          <h2>{this.props.opponent.name}</h2>
          {this.props.opponent.cards.map((card) => {
            return <div className="card--won"><img src={card.photo.thumbUrl} /></div>;
          })}
        </div>
      </div>
    );
  }
}

class Card extends Component {
  render() {
    const className = this.props.isFlipped ? "revealed" : "hidden";
    const style = { margin: "10px" };

    return (
      this.props.isRemoved ?
        <div className={"card"} style={style}></div> :
        <div className={"card " + className} style={style} onClick={this.props.onClick}>
          <div className="card-front">
            <img src={this.props.photo.thumbUrl} />
          </div>
          <div className="card-back" style={{backgroundColor: "#ccc", height: "100%"}}>
          </div>
        </div>
    );
  }
}
