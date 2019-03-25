
//Global variable declaration
var scores, roundScore, activePlayer;
//Variable initialization
scores = [0,0];
roundScore = 0;
activePlayer = 0;

//Initial game settings
animateCSS('#name-' + activePlayer, 'bounce');
document.querySelector('.dice').style.display = 'none';
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-0').textContent = '0';

//Roll-Dice button functionality
document.querySelector('.btn-roll').addEventListener('click', function() {
    
    //Random number for dice
    var dice = Math.floor(Math.random() * 6) + 1;
    
    //Display respective dice image and animate
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    animateCSS('.dice', 'shake');
    
    //Update the round score IF the rolled number was NOT a 1.
    if(dice !== 1)
    {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }
    else 
    {  
        //Change activePlayer
        nextPlayer();
    }
});

//Hold button functionality
document.querySelector('.btn-hold').addEventListener('click', function() {
   
    //Add roundScore to the players total score
    scores[activePlayer] += roundScore;
    
    //Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //Check if player has won the game
    if(scores[activePlayer] >= 10) 
    {
        //Clear current score
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //Update UI
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');     
    }
    else
    {
        //change player
        nextPlayer();
    }
});

//Adds points to the respective player, updates the UI and changes to the next player.
function nextPlayer() {
    
    //Clear roundScore.
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = 0;
    
    //Change activePlayer
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    //Animate new activePlayer
    animateCSS('#name-' + activePlayer, 'bounce');
    
    //Change activePlayer background-color.
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');
    
    //Rehide dice
    diceDOM.style.display = 'none';
}

//Function for the animation of elements.
function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
}



//textContent will only set text.
//document.querySelector('#current-' + activePlayer).textContent = dice;
//innerHTML will set or retrieve text. Can also set new HTML elements for the content of the selected element.
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
//Asign a CSS property and value to an element.




