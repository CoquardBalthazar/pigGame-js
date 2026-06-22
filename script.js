'use strict';

// SELECTION OF ALL ELEMENTS INTO VARIABLES
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1'); // Carefull, without using the # when using getElementById
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const modalOverlay = document.querySelector('.modal-overlay');
const btnModalClose = document.querySelector('.modal__close');
const btnModalPlay = document.querySelector('.modal__play');

const closeModal = () => modalOverlay.classList.add('hidden');
btnModalClose.addEventListener('click', closeModal);
btnModalPlay.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

const diceEl = document.querySelector('.dice');
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

// SETTING GAME SETUP
let gameOn, scores, activePlayer,currentScore;

const init = function(){
  gameOn = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0.textContent = 0;
  score1.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  //teacher solution init styles :
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  /*Solution Balu init styles :
  if (document.querySelector(`.player--${activePlayer}`).classList.contains('player--winner')){
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
  }
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
  */
}

init()

const switchPlayer = function(){
  document.getElementById(`current--${activePlayer}`).textContent =0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? (activePlayer = 1) : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// FUNCTIONALITIES ---------------------------------------------
// Roll dice Button

btnRollEl.addEventListener('click', function () {
  if (gameOn){
    // 1. Generating a random Dice
    const dice = Math.trunc(Math.random() * 6) + 1;
  
    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`; // Carefull to the string literal only with ``
  
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      // switch Player & set currentScore to 0
      switchPlayer()
    }
  }
});

// Hold Current Score Button

btnHoldEl.addEventListener('click', function(){
  if (gameOn){
    // 1. Add current score to active player's score (in code and display)
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    console.log(activePlayer)
    
    // 2, Check if score >= 100;
    if (scores[activePlayer]>=100){
      // Yes : Finish the game
      gameOn=false;
      document.querySelector(`.player--${activePlayer}`).classList.add(`player--winner`);
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    }else{
      // Switch Player (create a function for switch player)
      switchPlayer()
    }
  }
})

// New Gamer button functionalities
btnNewEl.addEventListener('click', init);