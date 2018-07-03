/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, dice, isWin, winnerScore;
function hideDice() {
    var dice = document.querySelectorAll(".dice");
    for (var i = 0; i < 2; i++) {
        dice[i].style.display = 'none'
    }
}

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isWin = false;
    winnerScore = 30;

    hideDice();


    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-1').textContent = 0;

    // set back name of player after once win
    document.querySelector('#name-0').textContent = 'Player 1'
    document.querySelector('#name-1').textContent = 'Player 2 '

    // remove winner class
    document.querySelector(".player-0-panel").classList.remove('winner');
    document.querySelector(".player-1-panel").classList.remove('winner');
    document.querySelector(".player-0-panel").classList.remove('active');
    document.querySelector(".player-1-panel").classList.remove('active');
    document.querySelector(".player-0-panel").classList.add('active');
}
init();


// document.querySelector("#score-" + activePlayer).textContent = dice;
document.querySelector('.btn-roll').addEventListener('click', function () {
    dice0 = Math.floor(Math.random() * 6 + 1);
    dice1 = Math.floor(Math.random() * 6 + 1);

    if (!isWin) {
        // 1. display the result 
        var diceDOM_0 = document.querySelector("#dice-0");
        var diceDOM_1 = document.querySelector("#dice-1");
        diceDOM_0.style.display = 'block';
        diceDOM_1.style.display = 'block';
        diceDOM_0.src = 'dice-' + dice0 + '.png';
        diceDOM_1.src = 'dice-' + dice1 + '.png';

        // 2. update the score if the rolled was not a 1
        if (dice0 !== 1 && dice1 !== 1) {
            // add scrore
            roundScore += dice0 + dice1;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //next player
            nextPlayer();
        }
    }
});

document.querySelector(".btn-hold").addEventListener("click", function () {

    if (!isWin) {
        // Add the Current score to global scores
        scores[activePlayer] += roundScore;
        // Update the UI
        document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
        // Check if player won the game
        if (scores[activePlayer] > winnerScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            hideDice();
            isWin = true;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    hideDice();
}


// click new game btn
document.querySelector(".btn-new").addEventListener("click", init)

//add winner score
function handle(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        winnerScore = e.target.value;
        console.log(winnerScore)
    }
}