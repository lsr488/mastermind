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

var codeDisplay = document.querySelector("#code");
var codeContainerDisplay = document.querySelector("#code-container");
var guessesDisplay = document.querySelector("#guesses");
var hintsDisplay = document.querySelector("#hints");
var firstColor = document.querySelector("#first-color");
var secondColor = document.querySelector("#second-color");
var thirdColor = document.querySelector("#third-color");
var fourthColor = document.querySelector("#fourth-color");
var guessesArchiveDisplay = document.querySelector("#guessesArchive");
var hintsArchiveDisplay = document.querySelector("#hintsArchive");
var guessInput1 = document.querySelector("#first-guess");
var guessInput2 = document.querySelector("#second-guess");
var guessInput3 = document.querySelector("#third-guess");
var guessInput4 = document.querySelector("#fourth-guess");
var submitButton = document.querySelector("#submit");
var turnsLeftDisplay = document.querySelector("#turns-left");
var statusDisplay = document.querySelector("#status-display");

var colors = ["R", "O", "Y", "G", "B", "P"];
var code = [];
var guesses = "";
var guessesArchive = [];
var hintsArchive = [];

// beware of codeNumber > colors.length
// because we're using colors.length as a 
// a limiter on the random number generator
// and also requiring unique numbers, so it literally
// has spaces that can't be filled

// TODO: create an option for more colors and a longer code to break

var codeNumber = 4;
var turnNumber = 10;

function genCode() {
	displayTurns();
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

// TODO make this more flexible for more input options
submitButton.addEventListener("click", function(event) {
	guesses = "";
	guesses = guesses + guessInput1.value + " " + guessInput2.value + " " + guessInput3.value + " " + guessInput4.value;
		getGuess();
	// console.log(guesses);
});


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

	console.log("guesses from input:", guesses);

	// var guesses = "r,o,y,g";	
	guesses = guesses.toUpperCase().split(" ");
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

	// for guess archive display
	console.log("guesses archive:", guessesArchive);
	guessesArchive.forEach(function(element) {
		console.log("guesses archive element:", element);

		for(var i = 0; i < element.length; i++) {
			var archiveClass = "";
			if(element[i] == "R") {
				archiveClass = "red-bg";
			}		
			else if(element[i] == "O") {
				archiveClass = "orange-bg";
			}		
			else if(element[i] == "Y") {
				archiveClass = "yellow-bg";
			}		
			else if(element[i] == "G") {
				archiveClass = "green-bg";
			}		
			else if(element[i] == "B") {
				archiveClass = "blue-bg";
			}		
			else if(element[i] == "P") {
				archiveClass = "purple-bg";
			}				

			guessesArchiveString += `<div class="boxes ${archiveClass}">${element[i]}</div> `;
		}
		guessesArchiveString += `<br>`;
	});

	console.log("guess archive string:", guessesArchiveString);

	// for hints archive display
	for(var j = 0; j < hintsArchive.length; j++) {
		hintsArchiveString += '<div class="hint">' + hintsArchive[j].sort().join(" ") + "</div>";
	}

	// console.log(guessesArchiveString + hintsArchiveString)

	// console.log(guessesArchiveString);
	// console.log(hintsArchiveString);

	// display guesses on webpage
	firstColor.textContent = guessInput1.value.toUpperCase();
	secondColor.textContent = guessInput2.value.toUpperCase();
	thirdColor.textContent = guessInput3.value.toUpperCase();
	fourthColor.textContent = guessInput4.value.toUpperCase();
	// guessesDisplay.textContent = guesses.join(", ");
	hintsDisplay.textContent = hints.sort().join(" ");
	guessesArchiveDisplay.innerHTML = guessesArchiveString;
	hintsArchiveDisplay.innerHTML = hintsArchiveString;


	// toggle color-bg class based on guesses[i] content
	// TODO: figure out how to make it more flexible
	assignBgColor(guesses, firstColor, 0);
	assignBgColor(guesses, secondColor, 1);
	assignBgColor(guesses, thirdColor, 2);
	assignBgColor(guesses, fourthColor, 3);

	turnNumber--;
	displayTurns();
	isWon(isExactMatch);
	isOutOfTurns();
}

function assignBgColor(guesses, display, index) {
	display.setAttribute("class", "boxes");
	if(guesses[index] == "R") {
		display.classList.add("red-bg");
	}		
	else if(guesses[index] == "O") {
		display.classList.add("orange-bg");
	}		
	else if(guesses[index] == "Y") {
		display.classList.add("yellow-bg");
	}		
	else if(guesses[index] == "G") {
		display.classList.add("green-bg");
	}		
	else if(guesses[index] == "B") {
		display.classList.add("blue-bg");
	}		
	else if(guesses[index] == "P") {
		display.classList.add("purple-bg");
	}
}

function assignArchiveColor(element, index) {
	var archiveClass = "";

	if(element[index] == "R") {
		archiveClass = "red-bg";
	}		
	else if(element[index] == "O") {
		archiveClass = "orange-bg";
	}		
	else if(element[index] == "Y") {
		archiveClass = "yellow-bg";
	}		
	else if(element[index] == "G") {
		archiveClass = "green-bg";
	}		
	else if(element[index] == "B") {
		archiveClass = "blue-bg";
	}		
	else if(element[index] == "P") {
		archiveClass = "purple-bg";
	}	
}

function isWon(isExactMatch) {
	// if exactmatch == 4
	if(isExactMatch == 4) {
		disableInputs();
		// codeContainerDisplay.classList.toggle("active")
		statusDisplay.classList.toggle("active")
		statusDisplay.textContent = "You won!";
	}
}

function isOutOfTurns() {
	if(turnNumber == 0) {
		disableInputs();
		// codeContainerDisplay.classList.toggle("active")
		statusDisplay.classList.toggle("active")
		statusDisplay.textContent = "You're out of turns.";
	}
}

function disableInputs() {
	guessInput1.setAttribute("disabled", "disabled");
	guessInput2.setAttribute("disabled", "disabled");
	guessInput3.setAttribute("disabled", "disabled");
	guessInput4.setAttribute("disabled", "disabled");
	submitButton.setAttribute("disabled", "disabled");
}

function displayTurns() {
	turnsLeftDisplay.textContent = turnNumber;
}

// function resetGame() {
	// tempCode = [];
	// code = [];
	// guesses = [];
	// guessesArchive = [];
	// guessesArchiveString = "";
	// hintsArchive = [];
	// hintsArchiveString = "";
	// codeDisplay.textContent = "";
	// guessesDisplay.textContent = "";
	// guessesDisplay.textContent = "";
	// hintsDisplay.textContent = "";
	// guessesArchiveDisplay.innerHTML = "";
	// hintsArchiveDisplay.innerHTML = "";
// }

// startGame();
genCode();