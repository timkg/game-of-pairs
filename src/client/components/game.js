import React, { Component } from "react";

export default class Game extends Component {
  render() {
    const flippedCards = this.props.currentTurn.flippedCards;

    return (
      <div className="game">
      {this.props.cards.map((c) => {
        const isFlipped = flippedCards.indexOf(c.id) >= 0;
        return <Card key={c.id} flip={this.props.flip.bind(null, this.props.id, this.props.player.id)} isFlipped={isFlipped} {...c} />;
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
  handleClick() {
    return this.props.flip(this.props.id);
  }

  render() {
    const className = this.props.isFlipped ? "revealed" : "hidden";
    const style = { backgroundColor: "#ccc", margin: "10px" };

    return (
      <div className={"card " + className} style={style} onClick={this.handleClick.bind(this)}>
        <div className="card-front">
          <img src={this.props.photo.thumbUrl} />
        </div>
        <div className="card-back">
        </div>
      </div>
    );
  }
}
