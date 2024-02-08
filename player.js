import Hand from './hand.js'

export default class Player {
    constructor() {
      this.hand = new Hand();
      this.split = [new Hand(), new Hand()];
      this.bank = 500;
    }

    hit(deck) {
      const card = deck.dealCard();
      this.hand.addCard(card);
    }
    isBust() {
      return this.hand.calculateValue() > 21;
    }
    splitHand(deck) {

      const card1 = this.hand.cards[0];
      const card2 = this.hand.cards[1];

      this.split[0].addCard(card1)
      this.split[1].addCard(card2)
      this.split[0].addCard(deck.dealCard())
      this.split[1].addCard(deck.dealCard())
    }
    clearHand() {
      this.hand = new Hand();
    }
  }