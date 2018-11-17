// VARIABLES
// ============================================================================================

// Variables that input text to HTML IDs
const newGameButton = document.getElementById('new-game');
const currentGuessText = document.getElementById('current-guess');
const winsText = document.getElementById('wins');
const lossesText = document.getElementById('losses');
const guessRemainingText = document.getElementById('guesses');
const lettersGuessedText = document.getElementById('wrong-letters');

// Global variables for the game
    // movieList contains words with  repeating letters
const movieList = ['GLADIATOR', 'HALLOWEEN', 'ALIENS', 'SPACEBALLS', 'AVATAR', 'CASABLANCA', 'DEADPOOL', 'PREDATOR', 'GHOSTBUSTERS', 'INCEPTION'];
    // singleMovie contains words with no repeating letters
const singleMovie = ['ALIENS', 'VERTIGO', 'PSYCHO', 'CASINO', 'ROCKY', 'HAMLET', 'LABYRINTH', 'SCREAM', 'FARGO', 'JAWS', 'FROZEN', 'GRAVITY', 'SNATCH'];

const iFrames = {
    'ALIENS': '<iframe width="640" height="360" src="http://www.youtube.com/embed/ILYdzvSICes?rel=0&start=165&end=172&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'VERTIGO': '<iframe width="640" height="360" src="http://www.youtube.com/embed/GjPCk494e5Q?rel=0&start=65&end=71&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'PSYCHO': '<iframe width="640" height="360" src="http://www.youtube.com/embed/0WtDmbr9xyY?rel=0&start=50&end=60&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'CASINO': '<iframe width="640" height="360" src="http://www.youtube.com/embed/aIPmu6bYZOs?rel=0&start=5&end=12&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'ROCKY': '<iframe width="640" height="360" src="http://www.youtube.com/embed/_YYmfM2TfUA?rel=0&start=135&end=145&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'HAMLET': '<iframe width="640" height="360" src="http://www.youtube.com/embed/SjuZq-8PUw0?rel=0&start=22&end=31&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'LABYRINTH': '<iframe width="640" height="360" src="http://www.youtube.com/embed/1vcqMD5duiQ?rel=0&start=56&end=66&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'SCREAM': '<iframe width="640" height="360" src="http://www.youtube.com/embed/LWxSBbBX4fs?rel=0&start=72&end=81&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'FARGO': '<iframe width="640" height="360" src="http://www.youtube.com/embed/kPHbIyDTPHU?rel=0&start=9&end=22&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'JAWS': '<iframe width="640" height="360" src="http://www.youtube.com/embed/2I91DJZKRxs?rel=0&start=15&end=36&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'FROZEN': '<iframe width="640" height="360" src="http://www.youtube.com/embed/rnEB2F_v_cE?rel=0&start=4&end=15&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'GRAVITY': '<iframe width="640" height="360" src="http://www.youtube.com/embed/rnEB2F_v_cE?rel=0&start=4&end=15&autoplay=1" frameborder="0" allowfullscreen></iframe>',
    'SNATCH': '<iframe width="640" height="360" src="http://www.youtube.com/embed/tGDO-9hfaiI?rel=0&start=29&end=46&autoplay=1" frameborder="0" allowfullscreen></iframe>'
};

let wins = 0;
let losses = 0;
let remaining = 9;
let gameRunning = false;
    // These two variables create empty arrays in which to push underscore placeholders and wrong guesses
let underScore = [];
let wrongGuesses = [];

// FUNCTIONS
// =============================================================================================

function clearVideoIframe() {
  const videoContainer = document.getElementById('video-container');
  videoContainer.innerHTML = '';
}

function insertVideoIntoIframe(currentWord, availableIframes) {
  const videoContainer = document.getElementById('video-container');
  videoContainer.insertAdjacentHTML('beforeend', availableIframes[currentWord]);
}

// Function to start or reset the game with baseline stats and a new word
function newGame() {
    gameRunning = true;
    remaining = 9;
    underScore = [];
    wrongGuesses = [];
    // This creates a variable that pulls a random word from our word array
    currentWord = singleMovie[Math.floor(Math.random() * singleMovie.length)];
    // This generates a length of underscores based on the length of the chosen word
        for(i = 0; i < currentWord.length; i++) {
            underScore.push('_');
        }
    // These write the game information to the HTML document
    currentGuessText.innerHTML = underScore.join(' ');
    guessRemainingText.innerHTML = remaining;
    lettersGuessedText.innerHTML = wrongGuesses.join(' ');

    // clear the old video from the container, if there was one
    clearVideoIframe();
    setNewGameButtonText('Have fun!');
    setNewGameButtonState(true);
}

function setNewGameButtonText(newText) {
  newGameButton.innerHTML = newText;
}

// this lets us force the user to finish the game - it disables the button and
// changes the color by removing the bg-dark class
function setNewGameButtonState(disabled) {
  newGameButton.disabled = disabled;

  if (disabled) {
    newGameButton.classList.remove('bg-dark');
  } else {
    newGameButton.classList.add('bg-dark');
  }
}

function handleWin(movieName) {
  // insert a new video for the specified movie
  insertVideoIntoIframe(movieName, iFrames);
  singleMovie.splice( singleMovie.indexOf(currentWord), 1 );
  console.log(singleMovie);

  // change "Click here to play!" button text to "You win! Click here to play
  // AGAIN!" so that you can let the user take their time to watch the movie
  // clip (e.g., don't use the alert and don't trigger a new game right away)
  setNewGameButtonText('You win! Click here to play AGAIN!');
  setNewGameButtonState(false);
  wins++;
}

function handleLoss() {
  alert('You lose!');
  losses++;
  setNewGameButtonText('LOL. You suck. Click to try again.');
  setNewGameButtonState(false);
}

// Function to check if the user guess matches the current word
document.onkeyup = function(eventGuess) {
    if(gameRunning === true && wrongGuesses.indexOf(eventGuess) === -1) {
        // Logic for playing the game
        if(eventGuess.keyCode >= 65 && eventGuess.keyCode <= 90) {
            let userGuess = String.fromCharCode(eventGuess.keyCode);
            if(currentWord.indexOf(userGuess) > -1) {
                underScore[currentWord.indexOf(userGuess)] = userGuess;
                if(underScore.join("") === currentWord) {
                    handleWin(currentWord);
                    // Below from JJ on how to activate video clips on win by using an object
                    // var iframe =document.getElementById(iframe);
                    // iframe.setAttribute('src', 'alsdkjfalsdkjf;asdlfkja;sd')
                    // obj[currentWord];
                }
            }
            else {
                if(wrongGuesses.indexOf(userGuess) === -1) {
                wrongGuesses.push(userGuess);
                remaining--;
                    }
            }

            if(remaining === 0) {
                handleLoss();
            }
            currentGuessText.innerHTML = underScore.join(' ');
            lettersGuessedText.innerHTML = wrongGuesses.join(' ');
            winsText.innerHTML = wins;
            lossesText.innerHTML = losses;
            guessRemainingText.innerHTML = remaining;
        }
    }
    else {
        if(gameRunning === false) {
            alert('Click the New Game button to play!');
        } else {
            alert('That letter has already been guessed - try a new one!');
        }
    }


}
// Calls the newGame function when the button is clicked
newGameButton.addEventListener('click', newGame);

// REMAINING QUESTIONS/ISSUES
// =================================================================

// Got words to repeat but now need to initialize a final winning screen after all words guessed (also need to clean up code around usedWord)

// Add instructions "Pick a letter" after New Game button is pressed (could be on same button)
    // Once a letter is pressed, button is set to "Click to reset the game" (connect to gameRunning = true)

// How can I allow for words with multiple letters that are the same?

// How can I display the full correct word before the game resets?
