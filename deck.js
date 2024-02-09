export default class Deck {
    constructor() {
      this.cards = this.createDeck();
      this.shuffle();
    }

    createDeck() {
      const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
      const deck = [];

      for (const suit of suits) {
        for (const rank of ranks) {
          deck.push(new Card(rank, suit));
        }
      }

      return deck;
    }

    shuffle() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }

    dealCard() {
        return this.cards.pop();
       //return new Card('5','hearts')   
    }
  }

class Card {
    constructor(rank, suit) {
      this.rank = rank;
      this.suit = suit;
    }

    getValue() {
      if (this.rank === 'A') {
        return 11;
      } else if (['K', 'Q', 'J'].includes(this.rank)) {
        return 10;
      } else {
        return parseInt(this.rank, 10);
      }
    }

    getCardImageURL() {
      //.charAt(length-1) because 10 requires 0 is url
      //therefore last char in string
        return `https://deckofcardsapi.com/static/img/${this.rank.charAt(this.rank.length-1)}${this.suit.charAt(0).toUpperCase()}.png`;
    }
    getBackOfCardImage(){
      return `https://deckofcardsapi.com/static/img/back.png`; 
    }
  }