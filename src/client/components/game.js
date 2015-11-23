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
        <div className="player-cards">
          <h2>{this.props.player.name}</h2>
          {this.props.player.cards.map((card) => {
            return <img src={card.photo.thumbUrl} />;
          })}
        </div>
        <div className="cards">

        <header>
          {this.isPlayersTurn() ? <p>Your turn!</p> : <p>Please wait for your turn.</p>}
        </header>

        {cards.map((card) => {
          const isFlipped = this.isCardFlipped(card.id);
          const onClick = this.isPlayersTurn() ?
            this.props.flip.bind(null, id, this.props.player.id, card.id) :
            () => { alert("Please wait for your turn!"); };

          return <Card key={card.id} onClick={onClick} isFlipped={isFlipped} {...card} />;
        })}
        </div>
        <div className="opponent-cards">
          <h2>{this.props.opponent.name}</h2>
          {this.props.opponent.cards.map((card) => {
            return <img src={card.photo.thumbUrl} />;
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
