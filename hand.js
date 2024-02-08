export default class Hand {
    constructor() {
      this.cards = [];
    }

    addCard(card) {
      this.cards.push(card);
    }
    hasAce(){
      for(const card of this.cards){
        if(card.rank === 'A'){
          return true;
        }
      }
      return false;
    }
    calculateValue() {
      let value = 0;
      let aces = 0;
      for(const card of this.cards){
          if(card.rank === 'A'){
            aces +=1;
          }
          else{
            value +=card.getValue();
          }
      }
      while(aces){
         ((value + 11) > 21) ? value += 1 : value += 11;
          aces--;
      }
      return value;
    }
}