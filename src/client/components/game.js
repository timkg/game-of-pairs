import React, { Component } from "react";

export default class Game extends Component {
  isPlayersTurn() {
    return this.props.currentTurn.activePlayer === this.props.player.id;
  }

  render() {
    const flippedCardIds = this.props.currentTurn.flippedCardIds;

    return (
      <div className="game">
      {this.props.cards.map((card) => {
        const isFlipped = flippedCardIds.indexOf(card.id) >= 0;
        const onClick = this.isPlayersTurn() ?
          this.props.flip.bind(null, this.props.id, this.props.player.id, card.id) :
          () => { alert("Please wait for your turn!"); };

        return <Card key={card.id} onClick={onClick} isFlipped={isFlipped} {...card} />;
      })}
      </div>
    );
  }
}

Game.defaultProps = {
  cards: [],
  currentTurn: {}
};

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
