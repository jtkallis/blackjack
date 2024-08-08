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
            value+=1;
          }
          else{
            value +=card.getValue();
          }
      }
      if((aces>0)&&(value+10<=21)){
      
          value+=10;
      }
      return value;
    }
}