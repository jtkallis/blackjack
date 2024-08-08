import Hand from './hand.js'

export default class Player {
    constructor() {
      this.hand = new Hand();
      this.split = new Hand();
      this.bank = 500;
      document.getElementById('player-bank').innerText=this.bank;
    }
    winBet(){
      this.bank+=20;
      document.getElementById('player-bank').innerText=this.bank;
    }
    loseBet(){
      this.bank-+20;
      document.getElementById('player-bank').innerText=this.bank;
    }
    hit(deck) {
      const card = deck.dealCard();
      this.hand.addCard(card);
    }
    hitSplit(deck){
      const card = deck.dealCard();
      this.split.addCard(card)
    }
    isBust() {
      return this.hand.calculateValue() > 21;
    }
    splitBust(){
      return this.split.calculateValue() > 21;
    }
    splitHand(deck) {

      const card1 = this.hand.cards[0];
      const card2 = this.hand.cards[1];

      this.split.addCard(card2)
      console.log(this.hand)
      this.hand.cards.splice(1,1)
      this.hand.addCard(deck.dealCard())
      this.split.addCard(deck.dealCard())
    }
    clearHand() {
      this.hand = new Hand();
      this.split = new Hand();
    }
  }