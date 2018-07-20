// guess pegs: 6, in different colors (these are possible options)
// key pegs: black/white to indicate yes/no
// code: 4 of 6 code peg colors, in specific order
	// easy: no duplicate colors
	// hard: duplicates allowed (special feedback rules)
// number of turns: 12, 10, or 8

// code is set (random generation)
// prompt user for guess
// compare guess against code set
// provide feedback on guess
	// for every correct color and correct location, use a black peg
	// for every correct color and incorrect location, use a white peg 
// game ends when the code is guessed or number of turns maxed out

// 0 red
// 1 orange
// 2 yellow
// 3 green
// 4 blue
// 5 purple

// resetGame should definitely not be in the startGame function
// but it is until I create a better way to reset code back to zero
var codeDisplay = document.querySelector("#code");
var guessesDisplay = document.querySelector("#guesses");
var hintsDisplay = document.querySelector("#hints");
var guessesArchiveDisplay = document.querySelector("#guessesArchive");
var hintsArchiveDisplay = document.querySelector("#hintsArchive");

function startGame() {
	genCode();
	startGuessLoop();
	// resetGame();
}

var colors = ["R", "O", "Y", "G", "B", "P"];
var code = [];
var guessesArchive = [];
var hintsArchive = [];

// beware of codeNumber > colors.length
// because we're using colors.length as a 
// a limiter on the random number generator
// and also requiring unique numbers, so it literally
// has spaces that can't be filled
// TODO: create an option for more colors and a longer code to break
var codeNumber = 4;
var turnNumber = 1;

function genCode() {
var tempCode = [];

	while(tempCode.length < codeNumber) {
		var colorSelector = genNum();
		if(!tempCode.includes(colorSelector)) {
			tempCode.push(colorSelector);		
		}
	}
	tempCode.forEach(function(el) {
		code.push(colors[el]);
	});
	console.log("code :", code);

	// display the code on the website
	codeDisplay.textContent = code.join(", ");
	return code;
}

// this potentially isn't very flexible if we want a bigger code
// because it's dependent on the length colors array
function genNum() {
	var x = (Math.floor(Math.random()*colors.length));
	return x;
}

// get user guess and compare guess against code
// TODO: refactor into 2 functions, getGuess and checkGuess
function getGuess() {
	var isInCode = 0;
	// var isNotInCode = 0;
	var isExactMatch = 0;
	// var isNotExactMatch = 0; 
	var hints = [];
	var guessesArchiveString = "";
	var hintsArchiveString = "";

	var guesses = "r,o,y,g";	
	// var guesses = window.prompt("Select four colors. There are no repeats. Example: R, G, B, O.");
	guesses = guesses.toUpperCase().split(",");
	console.log("guess:", guesses);

// check if exact match between code[i] and guesses[i]
	for(var i = 0; i < guesses.length; i++) {
		if(guesses[i] == code[i]) {
			console.log("match!", guesses[i], code[i]); // black key peg
			isExactMatch++;
			hints.push("*");
		} else if(code.includes(guesses[i])) {
			console.log(guesses[i] + " is in the code."); // white key peg
			isInCode++;
			hints.push("o");
		}
	}
	guessesArchive.push(guesses);
	hintsArchive.push(hints);

	console.log("Number of exact matches:", isExactMatch); // black key peg
	console.log("Number of colors included:", isInCode); // white key peg
	console.log(hints);

	for(var i = 0; i < guessesArchive.length; i++) {
		guessesArchiveString += guessesArchive[i].join(", ") + "<br>";
	}

	for(var j = 0; j < hintsArchive.length; j++) {
		hintsArchiveString += hintsArchive[j].sort().join(" ") + "<br>";
	}

	// console.log(guessesArchiveString + hintsArchiveString)

	// console.log(guessesArchiveString);
	// console.log(hintsArchiveString);

	// display guesses on webpage
	guessesDisplay.textContent = guesses.join(", ");
	hintsDisplay.textContent = hints.sort().join(" ");
	guessesArchiveDisplay.innerHTML = guessesArchiveString;
	hintsArchiveDisplay.innerHTML = hintsArchiveString;

}

function startGuessLoop() {
	while(turnNumber > 0) {
		getGuess();
		turnNumber--;
	}
}

function resetGame() {
	tempCode = [];
	code = [];
	guesses = [];
	guessesArchive = [];
	// guessesArchiveString = "";
	hintsArchive = [];
	// hintsArchiveString = "";
	// codeDisplay.textContent = "";
	// guessesDisplay.textContent = "";
	// guessesDisplay.textContent = "";
	// hintsDisplay.textContent = "";
	// guessesArchiveDisplay.innerHTML = "";
	// hintsArchiveDisplay.innerHTML = "";
}

startGame();