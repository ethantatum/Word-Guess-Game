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
const singleMovie = ['ALIENS', 'VERTIGO', 'PSYCHO', 'CASINO', 'ROCKY', 'HAMLET', 'LABYRINTH', 'SCREAM'];

let wins = 0;
let losses = 0;
let remaining = 9;
let gameRunning = false;
    // These three variables create empty arrays in which to push underscore placeholders, right guesses, and wrong guesses
let underScore = [];
let rightGuesses = [];
let wrongGuesses = [];

// FUNCTIONS
// =============================================================================================

// Function to start or reset the game with baseline stats and a new word
function newGame() {
    gameRunning = true;
    remaining = 9;
    underScore = [];
    // As of now, I'm not using rightGuesses, but it might be a solution for words with repeating letters...
    // rightGuesses = [];
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
}

// Function to check if the user guess matches the current word
document.onkeyup = function(eventGuess) {
    if(gameRunning === true && wrongGuesses.indexOf(eventGuess) === -1) {
        // Logic for playing the game
        if(eventGuess.keyCode >= 65 && eventGuess.keyCode <= 90) {
            let userGuess = String.fromCharCode(eventGuess.keyCode);
            if(currentWord.indexOf(userGuess) > -1) {
                // rightGuesses.push(userGuess);
                underScore[currentWord.indexOf(userGuess)] = userGuess;
                if(underScore.join("") === currentWord) {
                    alert('You win!');
                    wins++;
                    newGame();
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
                alert('You lose!');
                losses++;
                newGame();
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

// How can I allow for words with multiple letters that are the same?

// How can I display the full correct word before the game resets?