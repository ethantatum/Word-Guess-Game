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
const movieList = ['GLADIATOR', 'HALLOWEEN', 'ALIENS', 'SPACEBALLS', 'AVATAR', 'CASABLANCA', 'DEADPOOL', 'PREDATOR', 'GHOSTBUSTERS', 'INCEPTION'];
const singleMovie = ['ALIENS', 'VERTIGO', 'PSYCHO', 'CASINO', 'ROCKY', 'HAMLET', 'LABYRINTH', 'SCREAM']

let wins = 0;
let losses = 0;
let remaining = 9;
let gameRunning = false;
let underScore = [];
let rightGuesses = [];
let wrongGuesses = [];