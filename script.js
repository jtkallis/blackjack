import Deck from './deck.js';
import Player from './player.js';

let deck, player, dealer;

// Function to display the current state of the game
function displayGameStateStart() {
  //checks for possible split
  if(player.hand.cards[0].getValue() === player.hand.cards[1].getValue()){
    //create split button if it doesnt exist
    if(!document.getElementById('split-button')){
      const container = document.getElementById('game-container');
      const splitButton = document.createElement('button');
      splitButton.innerHTML = 'split'
      splitButton.id = 'split-button'
      container.appendChild(splitButton)
      document.getElementById('split-button').addEventListener('click', split)
    }
    
  }
  //checks if split exists
  if(player.split.cards.length){
    displayHand(player.split, 'player-split-container')
  }
  displayHand(player.hand, 'player-hand-container');
  //keeps dealer card face down
  displayDealerStartHand(dealer.hand, 'dealer-hand-container');
}
// Function to display the current state of the game
function displayGameState() {
  displayHand(player.hand, 'player-hand-container');
  displayHand(dealer.hand, 'dealer-hand-container');
}
//splits the players hand
function split(){
  player.splitHand(deck)
  console.log(player)
  if(document.getElementById('split-button')){
    document.getElementById('split-button').remove()
    const container = document.getElementById('game-container');
    const standSplitButton = document.createElement('button');
    const hitSplitButton = document.createElement('button');
    hitSplitButton.innerText = 'hit scond hand';
    standSplitButton.innerText = 'stand second hand';
    standSplitButton.id = 'stand-split-button';
    hitSplitButton.id = 'hit-split-button';
    container.appendChild(hitSplitButton);
    container.appendChild(standSplitButton);
    document.getElementById('hit-split-button').addEventListener('click', hitSplit)
    document.getElementById('stand-split-button').addEventListener('click', standSplit)
  }
  displayHand(player.hand, 'player-hand-container')
  displayHand(player.split, 'player-split-container')
}
function displayDealerStartHand(hand, containerId){
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const cardImage1 = document.createElement('img');
  cardImage1.src = hand.cards[0].getBackOfCardImage();
  cardImage1.alt = `${hand.cards[0].rank} of ${hand.cards[0].suit}`;
  cardImage1.className = 'card';
  container.appendChild(cardImage1);
  const cardImage2 = document.createElement('img');
  cardImage2.src = hand.cards[1].getCardImageURL();
  cardImage2.alt = `${hand.cards[1].rank} of ${hand.cards[1].suit}`;
  cardImage2.className = 'card';
  container.appendChild(cardImage2);
}
// Function to display a hand on the page
function displayHand(hand, containerId) {
  const container = document.getElementById(containerId);
  container.innerText = '';
  hand.cards.forEach(card => {
    const cardImage = document.createElement('img');
    cardImage.src = card.getCardImageURL();
    cardImage.alt = `${card.rank} of ${card.suit}`;
    cardImage.className = 'card';
    container.appendChild(cardImage);
  });
  if(containerId.includes('player')){
    const scoreContainer = document.getElementById('player-score');
    scoreContainer.innerText = hand.calculateValue();
  }
  else if (containerId.includes('dealer')){
    const scoreContainer = document.getElementById('dealer-score');
    scoreContainer.innerText = hand.calculateValue();
  }
}
function hitSplit(){
  console.log('hitsplit')
  player.hitSplit(deck);
  console.log(player)
  displayGameStateStart();
  if (player.splitBust()) {
    document.getElementById('result-container').innerText = 'You are bust! 😞';
    document.getElementById('hit-button').disabled=true;
    document.getElementById('stand-button').disabled=true;
    //stand()
  }
}
// Function to handle the player hitting
export function hit() {
  player.hit(deck);
  displayGameStateStart();
  if (player.isBust()) {
    document.getElementById('result-container').innerText = 'You are bust! 😞';
    document.getElementById('hit-button').disabled=true;
    document.getElementById('stand-button').disabled=true;
    //stand()
  }
}

// Function to handle the player standing
export function stand() {
  if(player.split.cards.length()){

  }
  else{
    
  }
  // Dealer's turn
  while (dealer.hand.calculateValue() < 17) {
    dealer.hit(deck);
    displayGameState();
  }
  if((dealer.hand.calculateValue() === 17) && dealer.hand.hasAce()){
    console.log('soft 17');
    dealer.hit(deck);
    displayGameState();
  }
  document.getElementById('dealer-score').innerText = dealer.hand.calculateValue();
  displayGameState();
  if(player.hand.calculateValue() <= 21 ){
    document.getElementById('result-container').innerText= 'you win';
  }
  else if(player.hand.calculateValue()<=21 && (player.hand.calculateValue()===dealer.hand.calculateValue())){
    document.getElementById('result-container').innerText= 'push!';
  }
  else{
    document.getElementById('result-container').innerText= 'you lose!';
  }
  document.getElementById('result-container').innerText= '';
}
export function double(){
  player.hit(deck);
  stand();
}
export function newHand() {
  document.getElementById('hit-button').disabled=false;
  document.getElementById('stand-button').disabled=false;
  if(document.getElementById('split-button')){
    console.log('last hand split')
    let el = document.getElementById('split-button')
    el.parentNode.removeChild(el)
  }
  player.clearHand();
  dealer.clearHand();
  console.log(deck.cards.length)
  if(deck.cards.length > 15){
    player.hit(deck)
    player.hit(deck)
    dealer.hit(deck)
    dealer.hit(deck)
    displayGameStateStart();
  }
  else{
    document.getElementById('result-container').innerText = 'New Deck!';
    deck = new Deck();
    player.hit(deck)
    player.hit(deck)
    dealer.hit(deck)
    dealer.hit(deck)
    console.log(deck.cards.length)
    displayGameStateStart();
  }
}
// Function to start the game
export function startGame() {
  deck = new Deck();
  player = new Player();
  dealer = new Player();

  player.hit(deck);
  player.hit(deck);
  dealer.hit(deck);
  dealer.hit(deck);

  displayGameStateStart();
}
