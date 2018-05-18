
alert('GAME RULES:\n- The game has 2 players, playing in rounds\n- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score\n- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it\'s the next player\'s turn\n- The player can choose to \'Hold\', which means that his ROUND score gets added to his GLBAL score. After that, it\'s the next player\'s turn\n- The first player to reach 100 points on GLOBAL score wins the game');

var scores, roundscore, activeplayer, gamePlaying = true, temp, prevsore;

init();


document.querySelector(".btn-roll").addEventListener('click', function() {
    
    if (gamePlaying) {
        
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        
        if (dice !== 1) {
            if ((dice !== 6)||(prevsore !== 6)) {
            //add score
            roundscore += dice;
            prevsore = dice;
            document.querySelector('#current-' + activeplayer).innerHTML = roundscore;
            }
    
            else {
                //next player
                nextplayer();
            }   
        }
        else {
                //next player
                nextplayer();
        }
    }
    
});

document.querySelector(".btn-hold").addEventListener('click', function() {
    
    if (gamePlaying) {
        
        scores[activeplayer] += roundscore;
        document.getElementById('score-' + activeplayer).innerHTML = scores[activeplayer];
    
        if (scores[activeplayer] >= temp) {
            document.querySelector('#name-' + activeplayer).innerHTML = 'WINNER!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        
        else {
            nextplayer();
        }
    }    
});
    
function nextplayer() {
    
    roundscore = 0;
    prevsore = 0;
    document.getElementById('current-' + activeplayer).innerHTML = 0;
    document.querySelector('.player-' + activeplayer + '-panel').classList.toggle('active');
    activeplayer = (activeplayer === 0) ?  1 : 0;
    document.querySelector('.player-' + activeplayer + '-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}
    
document.querySelector('.btn-new').addEventListener('click', init);
    
function init() {
    
    temp = prompt('Enter Player 1 name');
    document.getElementById('name-0').innerHTML = temp;
    temp = prompt('Enter Player 2 name');
    document.getElementById('name-1').innerHTML = temp;
    temp = prompt('Enter target score');
    
    scores = [0, 0];
    activeplayer = 0;
    roundscore = 0;
    prevsore = 0;
    
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').innerHTML = '0';
    document.getElementById('score-1').innerHTML = '0';
    document.getElementById('current-0').innerHTML = '0';
    document.getElementById('current-1').innerHTML = '0';
    
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    gamePlaying = true;
}