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

//game mode buttons
var gameModeEasy = document.querySelector("#easy");
var gameModeNormal = document.querySelector("#normal");
var gameModeHard = document.querySelector("#hard");

// game mode colors-banners
var easyColors = document.getElementById("easy-colors");
var normalColors = document.getElementById("normal-colors");
var hardColors = document.getElementById("hard-colors");

//instruction number
var easyNumber = document.getElementById("easy-number");
var normalNumber = document.getElementById("normal-number");
var hardNumber = document.getElementById("hard-number");

// display solution code
var codeDisplay = document.querySelector("#code");
var codeContainerDisplay = document.querySelector("#code-container");
var firstCode = document.querySelector("#first-code");
var secondCode = document.querySelector("#second-code");
var thirdCode = document.querySelector("#third-code");
var fourthCode = document.querySelector("#fourth-code");
var fifthCode = document.querySelector("#fifth-code");
var sixthCode = document.querySelector("#sixth-code");
var seventhCode = document.querySelector("#seventh-code");
var eighthCode = document.querySelector("#eight-code");

// display color guesses
var guessesDisplay = document.querySelector("#guesses");
var hintsDisplay = document.querySelector(".hints-display");
var firstColor = document.querySelector("#first-color");
var secondColor = document.querySelector("#second-color");
var thirdColor = document.querySelector("#third-color");
var fourthColor = document.querySelector("#fourth-color");
var fifthColor = document.querySelector("#fifth-color");
var sixthColor = document.querySelector("#sixth-color");
var seventhColor = document.querySelector("#seventh-color");
var eighthColor = document.querySelector("#eighth-color");

// archive displays
var guessesArchiveDisplay = document.querySelector("#guessesArchive");
var hintsArchiveDisplay = document.querySelector("#hintsArchive");

// guess inputs
var guessInput1 = document.querySelector("#first-guess");
var guessInput2 = document.querySelector("#second-guess");
var guessInput3 = document.querySelector("#third-guess");
var guessInput4 = document.querySelector("#fourth-guess");
var guessInput5 = document.querySelector("#fifth-guess");
var guessInput6 = document.querySelector("#sixth-guess");
var guessInput7 = document.querySelector("#seventh-guess");
var guessInput8 = document.querySelector("#eighth-guess");
var submitButton = document.querySelector("#submit");

// misc displays
var turnsLeftDisplay = document.querySelector("#turns-left");
var statusDisplay = document.querySelector("#status-display");

// var colors = ["R", "O", "Y", "G", "B", "P"];
// var codeNumber = 4;
// var turnNumber = 10;
// var code = [];
// var guesses = "";
// var guessesArchive = [];
// var hintsArchive = [];
var gameMode = "easy";
var gameStats = {
	shared: {
		code: [],
		guesses: "",
		guessesArchive: [],
		hintsArchive: [],
		// guessesArchiveString: "",
		// hintsArchiveString: ""
		// // gameMode: "easy"
	},
	easy: {
		colors: ["R", "O", "Y", "G", "B", "P"],
		codeNumber: 4,
		turnNumber: 10
	},
	normal: {
		colors: ["M", "R", "O", "Y", "G", "C", "B", "P"],
		codeNumber: 6,
		turnNumber: 8
	},
	hard: {
		colors: ["M", "R", "O", "Y", "L", "G", "C", "B", "P", "S"],
		codeNumber: 8,
		turnNumber: 6
	}
}

// beware of codeNumber > colors.length
// because we're using colors.length as a 
// a limiter on the random number generator
// and also requiring unique numbers, so it literally
// has spaces that can't be filled

// TODO: create an option for more colors and a longer code to break

gameModeEasy.addEventListener("click", function() {
	console.log("easy btn clicked");
	// gameMode
	gameModeEasy.classList.add("engaged");
	gameModeNormal.classList.remove("engaged");
	gameModeHard.classList.remove("engaged");
	
	// color banners
	easyColors.classList.remove("no-display");
	normalColors.classList.add("no-display");
	hardColors.classList.add("no-display");
	
	// instructions
	easyNumber.classList.remove("no-display");
	normalNumber.classList.add("no-display");
	hardNumber.classList.add("no-display");
	
	// guess boxes
	fifthCode.classList.add("no-display");
	sixthCode.classList.add("no-display");
	seventhCode.classList.add("no-display");
	eighthCode.classList.add("no-display");

	// guess inputs
	guessInput5.classList.add("no-display");
	guessInput6.classList.add("no-display");
	guessInput7.classList.add("no-display");
	guessInput8.classList.add("no-display");

	gameMode = "easy";
	displayTurns();
	gameSetUp();
});

gameModeNormal.addEventListener("click", function() {
	// gameMode
	gameModeNormal.classList.add("engaged");
	gameModeEasy.classList.remove("engaged");
	gameModeHard.classList.remove("engaged");

	// color banners
	easyColors.classList.add("no-display");
	normalColors.classList.remove("no-display");
	hardColors.classList.add("no-display");

	// instructions
	easyNumber.classList.add("no-display");
	normalNumber.classList.remove("no-display");
	hardNumber.classList.add("no-display");

	// guess boxes -- do these need to be removed/added?
	fifthColor.classList.remove("no-display");
	sixthColor.classList.remove("no-display");
	seventhColor.classList.add("no-display");
	eighthColor.classList.add("no-display");

	// guess inputs
	guessInput5.classList.remove("no-display");
	guessInput6.classList.remove("no-display");
	guessInput7.classList.add("no-display");
	guessInput8.classList.add("no-display");

	gameMode = "normal";
	displayTurns();
	gameSetUp();
});

gameModeHard.addEventListener("click", function() {
	// gameMode
	gameModeHard.classList.add("engaged");
	gameModeNormal.classList.remove("engaged");
	gameModeEasy.classList.remove("engaged");

	// color banners
	easyColors.classList.add("no-display");
	normalColors.classList.add("no-display");
	hardColors.classList.remove("no-display");

	// instructions
	easyNumber.classList.add("no-display");
	normalNumber.classList.add("no-display");
	hardNumber.classList.remove("no-display");

	// guess boxes
	fifthColor.classList.remove("no-display");
	sixthColor.classList.remove("no-display");
	seventhColor.classList.remove("no-display");
	eighthColor.classList.remove("no-display");

	// guess inputs
	guessInput5.classList.remove("no-display");
	guessInput6.classList.remove("no-display");
	guessInput7.classList.remove("no-display");
	guessInput8.classList.remove("no-display");


	gameMode = "hard";
	displayTurns();
	gameSetUp();
});

// TODO make this more flexible for more input options
submitButton.addEventListener("click", function(event) {
	// guesses gets reset to an empty string so the previous guesses aren't concatenated.
	guesses = "";
	if(gameMode == "easy") {
		guesses = guessInput1.value + " " + guessInput2.value + " " + guessInput3.value + " " + guessInput4.value;
	} 
	else if(gameMode == "normal") {
		guesses = guessInput1.value + " " + guessInput2.value + " " + guessInput3.value + " " + guessInput4.value + " " + guessInput5.value + " " + guessInput6.value;
	}
	else if(gameMode == "hard") {
		guesses = guessInput1.value + " " + guessInput2.value + " " + guessInput3.value + " " + guessInput4.value + " " + guessInput5.value + " " + guessInput6.value + " " + guessInput7.value + " " + guessInput8.value;
	}
		getGuess();
	// console.log(guesses);
});

// TODO is turnSetUp() needed?

function gameSetUp() {
	// var codeNumber = "";

	// gameMode = gameStats.shared.gameMode;
	code = gameStats.shared.code;
	guesses = gameStats.shared.guesses;
	guessesArchive = gameStats.shared.guessesArchive;
	// guessesArchiveString = gameStats.shared.guessesArchiveString;
	hintsArchive = gameStats.shared.hintsArchive;
	// hintsArchiveString = gameStats.shared.hintsArchiveString;

	if(gameMode == "easy") {
		codeNumber = gameStats.easy.codeNumber;
		colors = gameStats.easy.colors;
		turnNumber = gameStats.easy.turnNumber;
	} else if(gameMode == "normal") {
		codeNumber = gameStats.normal.codeNumber;
		colors = gameStats.normal.colors;
		turnNumber = gameStats.normal.turnNumber;
	} else if(gameMode == "hard") {
		codeNumber = gameStats.hard.codeNumber;
		colors = gameStats.hard.colors;
		turnNumber = gameStats.hard.turnNumber;
	}

	genCode(codeNumber);
}

// TODO reset all displays and underlying vars on-click of game modes
	// resetGame();

function genCode(codeNumber) {
	code = [];
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

	displayTurns();
	// console.log("code :", code);
}

// this potentially isn't very flexible if we want a bigger code
// because it's dependent on the length colors array
	// apparently setting colors in genCode(); via an if statement worked??
	// yay OOP??
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

	// console.log("guesses from input:", guesses);

	// var guesses = "r,o,y,g";	
	guesses = guesses.toUpperCase().split(" ");
	console.log("guess:", guesses);

// check if exact match between code[i] and guesses[i]
	for(var i = 0; i < guesses.length; i++) {
		if(guesses[i] == code[i]) {
			// console.log("match!", guesses[i], code[i]); // black key peg
			isExactMatch++;
			hints.push("*");
		} else if(code.includes(guesses[i])) {
			// console.log(guesses[i] + " is in the code."); // white key peg
			isInCode++;
			hints.push("o");
		}
	}
	guessesArchive.push(guesses);
	hintsArchive.push(hints);

	// console.log("Number of exact matches:", isExactMatch); // black key peg
	// console.log("Number of colors included:", isInCode); // white key peg
	// console.log(hints);

	// for guess archive display
	// console.log("guesses archive:", guessesArchive);
	guessesArchive.forEach(function(element) {
		// console.log("guesses archive element:", element);
		for(var i = 0; i < element.length; i++) {
			var archiveClass = "";
			if(element[i] == "R") {
				archiveClass = "red";
			}		
			else if(element[i] == "O") {
				archiveClass = "orange";
			}		
			else if(element[i] == "Y") {
				archiveClass = "yellow";
			}		
			else if(element[i] == "G") {
				archiveClass = "green";
			}		
			else if(element[i] == "B") {
				archiveClass = "blue";
			}
			else if(element[i] == "P") {
				archiveClass = "purple";
			}				
			else if(element[i] == "M") {
				archiveClass = "magenta";
			}				
			else if(element[i] == "L") {
				archiveClass = "lime";
			}				
			else if(element[i] == "C") {
				archiveClass = "cyan";
			}				
			else if(element[i] == "S") {
				archiveClass = "sienna";
			}
			// console.log(element[i]);
			guessesArchiveString += `<div class="boxes ${archiveClass}">${element[i]}</div> `;
			// console.log(guessesArchiveString);
		}
		guessesArchiveString += `<br>`;
	});

	// console.log("guess archive string:", guessesArchiveString);

	// for hints archive display
	for(var j = 0; j < hintsArchive.length; j++) {
		hintsArchiveString += '<div class="hint">' + hintsArchive[j].sort().join(" ") + "</div>";
	}

	// console.log(guessesArchiveString + hintsArchiveString);
	// console.log(guessesArchiveString);
	// console.log(hintsArchiveString);

	// display guesses on webpage
	addColorLetterToBoxDisplay(firstColor, guessInput1);
	addColorLetterToBoxDisplay(secondColor, guessInput2);
	addColorLetterToBoxDisplay(thirdColor, guessInput3);
	addColorLetterToBoxDisplay(fourthColor, guessInput4);
	if(gameMode == "normal") {
		addColorLetterToBoxDisplay(fifthColor, guessInput5);
		addColorLetterToBoxDisplay(sixthColor, guessInput6);
	}
	if(gameMode == "hard") {
		addColorLetterToBoxDisplay(fifthColor, guessInput5);
		addColorLetterToBoxDisplay(sixthColor, guessInput6);
		addColorLetterToBoxDisplay(seventhColor, guessInput7);
		addColorLetterToBoxDisplay(eighthColor, guessInput8);
	}

	guessesArchiveDisplay.innerHTML = guessesArchiveString;
	var hintsLength = hints.length;
	hintsDisplay.textContent = hints.sort().join(" ") + ` (${hintsLength})`;
	hintsArchiveDisplay.innerHTML = hintsArchiveString;

	// TODO: figure out how to make it more flexible
	assignBgColor(guesses, firstColor, 0);
	assignBgColor(guesses, secondColor, 1);
	assignBgColor(guesses, thirdColor, 2);
	assignBgColor(guesses, fourthColor, 3);
	if(gameMode == "normal") {
		assignBgColor(guesses, fifthColor, 4);
		assignBgColor(guesses, sixthColor, 5);
	}
	if(gameMode == "hard") {
		assignBgColor(guesses, fifthColor, 4);
		assignBgColor(guesses, sixthColor, 5);
		assignBgColor(guesses, seventhColor, 6);
		assignBgColor(guesses, eighthColor, 7);
	}

	turnNumber--;
	displayTurns();
	isGameOver(isExactMatch);
}

function displayTurns() {
	turnsLeftDisplay.textContent = turnNumber;
}

function addColorLetterToBoxDisplay(boxNum, guessInput) {
	boxNum.textContent = guessInput.value.toUpperCase();
}

// add color-bg class based on guesses[i] content
function assignBgColor(guesses, display, index) {
	display.setAttribute("class", "boxes");
	if(guesses[index] == "R") {
		display.classList.add("red");
	}		
	else if(guesses[index] == "O") {
		display.classList.add("orange");
	}		
	else if(guesses[index] == "Y") {
		display.classList.add("yellow");
	}		
	else if(guesses[index] == "G") {
		display.classList.add("green");
	}		
	else if(guesses[index] == "B") {
		display.classList.add("blue");
	}		
	else if(guesses[index] == "P") {
		display.classList.add("purple");
	}
	else if(guesses[index] == "M") {
		display.classList.add("magenta");
	}				
	else if(guesses[index] == "L") {
		display.classList.add("lime");
	}				
	else if(guesses[index] == "C") {
		display.classList.add("cyan");
	}				
	else if(guesses[index] == "S") {
		display.classList.add("sienna");
	}
}

function isGameOver(isExactMatch) {
	if(isExactMatch == 4) {
		endOfGameDisplay();
		disableInputs();
		endofGameStatusDisplay();
		statusDisplay.textContent = "You won!";
	} else if(turnNumber == 0) {
		endOfGameDisplay();
		disableInputs();
		endofGameStatusDisplay();
		statusDisplay.textContent = "You're out of turns.";
	}
}

function disableInputs() {
	guessInput1.setAttribute("disabled", "disabled");
	guessInput2.setAttribute("disabled", "disabled");
	guessInput3.setAttribute("disabled", "disabled");
	guessInput4.setAttribute("disabled", "disabled");
	guessInput5.setAttribute("disabled", "disabled");
	guessInput6.setAttribute("disabled", "disabled");
	guessInput7.setAttribute("disabled", "disabled");
	guessInput8.setAttribute("disabled", "disabled");
	submitButton.setAttribute("disabled", "disabled");
}

function endofGameStatusDisplay() {
	codeContainerDisplay.classList.toggle("no-display");
	statusDisplay.classList.toggle("no-display");
}

function endOfGameDisplay() {
	// can this be made more flexible?
	firstCode.textContent = code[0];
	secondCode.textContent = code[1];
	thirdCode.textContent = code[2];
	fourthCode.textContent = code[3];
	fifthCode.textContent = code[4];
	sixthCode.textContent = code[5];
	seventhCode.textContent = code[6];
	eighthCode.textContent = code[7];


	assignBgColor(code, firstCode, 0);
	assignBgColor(code, secondCode, 1);
	assignBgColor(code, thirdCode, 2);
	assignBgColor(code, fourthCode, 3);
	assignBgColor(code, fifthCode, 4);
	assignBgColor(code, sixthCode, 5);
	assignBgColor(code, seventhCode, 6);
	assignBgColor(code, eighthCode, 7);
}

function resetGame() {
	hintsDisplay.textContent = "";
	hintsArchiveDisplay.textContent = "";
	guessesDisplay.textContent = "";
	guessesDisplayArchive.textContent = "";
}

gameSetUp();