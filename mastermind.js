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
function startGame() {
	genCode();
	getGuess();
	resetGame();
}

var colors = ["R", "O", "Y", "G", "B", "P"];
var code = [];

// genCode can hang if codeNumber > colors.length
// because we're using colors.length as a 
// a limiter on the random number generator
// and also requiring unique numbers, so it literally
// has spaces that can't be filled
// TODO: create an option for more colors and a longer code to break
var codeNumber = 4;
var turnNumber = 10;

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
	// console.log("tempCode:", tempCode);
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
	var isNotInCode = 0;
	var isExactMatch = 0;
	var isNotExactMatch = 0; 

	var guesses = "R, O, Y, G";	
	// var guesses = window.prompt("Select four colors. There are no repeats. Example: R, G, B, O.");
	guesses = guesses.split(", ");
	console.log("guess:", guesses);

	// check if each element of guess appears is anywhere in code
	guesses.forEach(function(guess) {
		if(code.includes(guess)) {
			console.log(guess + " is in the code.");
			isInCode++;
		} else {
			console.log(guess + " is not in the code.");
			isNotInCode++;
		}
	});

// check if exact match between code[i] and guesses[i]
	for(var i = 0; i < guesses.length; i++) {
		if(guesses[i] == code[i]) {
			console.log("match!", guesses[i], code[i]); // black key peg
			isExactMatch++;
		} else {
			console.log("no match:", guesses[i], code[i]); // is this needed?
			isNotExactMatch++;
		}
	}

	console.log("Number of colors included:", isInCode); // white key peg
	if(isInCode > 0) {
		var includedColor = [];
		for(var i = 0; i < isInCode; i++) {
			includedColor.push("o");
		}
		console.log(includedColor);
	}
	// console.log("Number of colors not included: ", isNotInCode);
	console.log("Number of exact matches:", isExactMatch); // black key peg
	if(isExactMatch > 0) {
		var exactColor = [];
		for(var i = 0; i < isExactMatch; i++) {
			exactColor.push(".");
		}
		console.log(exactColor);
	}
	// console.log("Number of inexact matches:", isNotExactMatch);
	// if(isNotExactMatch > 0 && isInCode > 0) {
	// 	console.log("Number of inexact matches:", isNotExactMatch, isInCode);
	// }

}

// compare guess against code
function checkGuess(guesses) {
	getGuess();	

	console.log(guesses);
}

function resetGame() {
	tempCode = [];
	code = [];
}

startGame();