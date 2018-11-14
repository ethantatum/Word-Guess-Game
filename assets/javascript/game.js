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
    underscore = [];
    rightGuesses = [];
    wrongGuesses = [];
    // This creates a variable that pulls a random word from our word array
    currentWord = singleMovie[Math.floor(Math.random() * singleMovie.length)];
    // This generates a length of underscores based on the length of the chosen word
        for(i = 0; i < currentWord.length; i++) {
            underScore.push('_');
        }
    // These write the game information to the HTML document
        // QUESTION: Why isn't my currentGuess replaced with each new game?

    currentGuessText.textContent = underScore.join(' ');
    guessRemainingText.textContent = remaining;
    lettersGuessedText.textContent = wrongGuesses.join(' ');
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
                console.log(underScore);
                if(underScore.join("") === currentWord) {
                    alert('You win!');
                    wins++;
                    newGame();
                }
            } 
            else {
                wrongGuesses.push(userGuess);
                remaining--;
            }
        
            if(remaining === 0) {
                alert('You lose!');
                losses++;
                newGame();
            }
            currentGuessText.textContent = underScore.join(' ');
            lettersGuessedText.textContent = wrongGuesses.join(' ');
            winsText.textContent = wins;
            lossesText.textContent = losses;
            guessRemainingText.textContent = remaining;
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

// Captures user key strokes to enter in 
// document.onkeyup = function(eventGuess) {
//     if(event.keyCode >= 65 && event.keyCode <= 90) {
//         let userGuess = String.fromCharCode(eventGuess.keyCode);
//     }