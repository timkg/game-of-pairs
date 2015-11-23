import React, { Component } from "react";

export default class Game extends Component {
  isPlayersTurn() {
    return this.props.game.currentTurn.activePlayer === this.props.player.id;
  }

  isCardFlipped(cardId) {
    return this.props.game.currentTurn.flippedCardIds.indexOf(cardId) >= 0;
  }

  render() {
    const { id, currentTurn, cards } = this.props.game;

    return (
      <div className="game">
      {cards.map((card) => {
        const isFlipped = this.isCardFlipped(card.id);
        const onClick = this.isPlayersTurn() ?
          this.props.flip.bind(null, id, this.props.player.id, card.id) :
          () => { alert("Please wait for your turn!"); };

        return <Card key={card.id} onClick={onClick} isFlipped={isFlipped} {...card} />;
      })}
      </div>
    );
  }
}

class Card extends Component {
  render() {
    const className = this.props.isFlipped ? "revealed" : "hidden";
    const style = { backgroundColor: "#ccc", margin: "10px" };

    return (
      <div className={"card " + className} style={style} onClick={this.props.onClick}>
        <div className="card-front">
          <img src={this.props.photo.thumbUrl} />
        </div>
        <div className="card-back">
        </div>
      </div>
    );
  }
}
