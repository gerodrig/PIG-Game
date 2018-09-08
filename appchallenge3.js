/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, roundScore2, activePlayer, gamePlaying, previousDice; //always remember to define a state variable (gamePlaying)

init();
// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

//DOM Manipulation use document object
//document.querySelector('#current-' + activePlayer).textContent = dice;  //query selector lets us selects things in css
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>' // this is to insert HTML <em> = italics

// var x = document.querySelector('#score-0').textContent; // we can also get a value from HTML
// console.log(x);

// function btn(){
//   //Do something here
// }
// btn();

document.querySelector('.btn-roll').addEventListener('click', function(){  // <--- this is an anonymous function only can be used once
  if (gamePlaying) {

    // 1. Random number
    var dice = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1] ; //Challenge 3 second dice with arrays
  
      // 2. Display the result
    var diceDOM = [document.querySelector('.dice'), document.querySelector('.dice2')];
    diceDOM[0].style.display = 'block';
    diceDOM[1].style.display = 'block';
    diceDOM[0].src = 'dice-' + dice[0] + '.png';
    diceDOM[1].src = 'dice-' + dice[1] + '.png';
  
    //3. Update the round score IF the rolled number was NOT a 1
    if (dice[0] !== 1 && dice[1] !== 1) {
      //Add score
      roundScore += dice[0] + dice [1];
      document.querySelector('#current-' + activePlayer).textContent = roundScore
    } else {
      //Next player
      nextPlayer();
    }
    ;
  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (roundScore > 0) {
    if (gamePlaying) {
      // Add current score to GLOBAL score
      scores[activePlayer] += roundScore;

    
      //Update UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer]

      var input = document.querySelector('.final-score').value;
      var winningScore;

      //All the values of undefined, 0, null or "" are coerced to false
      // anything else is COERCED to true
      if (input) {
        winningScore = input;
      } else {
        winningScore = 100;
      }

      //check if the player won the game
      if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!!!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
      } else {
        // change player when hold button is clicked
        nextPlayer();
      }
    }
  }
});

//Next player function
function nextPlayer () {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;  // Ternary operator in action
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active'); //remove --> takes away te class
    //document.querySelector('.player-1-panel').classList.add('active'); // add --> the class
    document.querySelector('.player-0-panel').classList.toggle('active');//toggle --> if the class is not there it adds it and viceversa
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none'; //challenge 3 second dice hidden when switching player
}
  
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none'; // take the class dice and set the display to none to have dice hidden
  document.querySelector('.dice2').style.display = 'none'; // Challenge 3 second dice hidden

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
// to check events --> developer.mozilla.org/en-US/docs/Web/Events