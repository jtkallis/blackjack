import Deck from './deck.js';
import Player from './player.js';

let deck, player, dealer;

// Function to display the current state of the game
function displayGameStateStart() {
  if(player.hand.cards[0].rank === player.hand.cards[1].rank){
    const container = document.getElementById('game-container');
    const splitButton = document.createElement('button');
    splitButton.innerHTML = 'split'
    splitButton.id = 'split-button'
    container.appendChild(splitButton)
    document.getElementById('split-button').addEventListener('click', split)
  }
  displayHand(player.hand.cards, 'player-hand-container');
  displayDealerStartHand(dealer.hand.cards, 'dealer-hand-container');
}
// Function to display the current state of the game
function displayGameState() {
  displayHand(player.hand.cards, 'player-hand-container');
  displayHand(dealer.hand.cards, 'dealer-hand-container');
}
function split(){
  player.splitHand(deck)
  console.log(player)
  displayHand(player.split[0].cards, 'player-hand-container')
  displayHand(player.split[1].cards, 'player-split-container')
}
function displayDealerStartHand(cards, containerId){
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  const cardImage1 = document.createElement('img');
  cardImage1.src = cards[0].getBackOfCardImage();
  cardImage1.alt = `${cards[0].rank} of ${cards[0].suit}`;
  cardImage1.className = 'card';
  container.appendChild(cardImage1);
  const cardImage2 = document.createElement('img');
  cardImage2.src = cards[1].getCardImageURL();
  cardImage2.alt = `${cards[1].rank} of ${cards[1].suit}`;
  cardImage2.className = 'card';
  container.appendChild(cardImage2);
}
// Function to display a hand on the page
function displayHand(cards, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  cards.forEach(card => {
    const cardImage = document.createElement('img');
    cardImage.src = card.getCardImageURL();
    cardImage.alt = `${card.rank} of ${card.suit}`;
    cardImage.className = 'card';
    container.appendChild(cardImage);
  });
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
  displayGameState();
  if((player.hand.calculateValue() <= 21)){

  }
  document.getElementById('result-container').innerText= '';
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
