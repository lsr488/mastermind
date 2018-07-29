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

// display color guesses
var guessesDisplay = document.querySelector("#guesses");
var hintsDisplay = document.querySelector(".hints-display");

// archive displays
var guessesArchiveDisplay = document.querySelector("#guessesArchive");
var hintsArchiveDisplay = document.querySelector("#hintsArchive");

// color bank
var guessBank = document.querySelector("#color-guess-bank");
var bankRed = document.querySelector("#bank-red");
var bankOrange = document.querySelector("#bank-orange");
var bankYellow = document.querySelector("#bank-yellow");
var bankGreen = document.querySelector("#bank-green");
var bankBlue = document.querySelector("#bank-blue");
var bankPurple = document.querySelector("#bank-purple");
var bankMagenta = document.querySelector("#bank-magenta");
var bankLime = document.querySelector("#bank-lime");
var bankCyan = document.querySelector("#bank-cyan");
var bankSienna = document.querySelector("#bank-sienna");
var checkGuessButton = document.getElementsByName("check-guess")[0];
var resetTurnButton = document.getElementsByName("reset-turn")[0];
var resetGameButton = document.getElementsByName("reset-game")[0];

// misc displays
var turnsLeftDisplay = document.querySelector("#turns-left");
var statusDisplay = document.querySelector("#status-display");

var gameMode = "easy";
var gameStats = {
	shared: {
		code: [],
		guesses: [],
		guessesArchive: [],
		guessesArchiveString: "",
		currentGuess: "",
		hints: [],
		hintsArchive: [],
		hintsArchiveString: "",
		isInCode: 0,
		isExactMatch: 0,
		codeGuessNumber: 0,
	},
	easy: {
		colors: ["R", "O", "Y", "G", "B", "P"],
		codeNumber: 4,
		turnNumber: 10
	},
	normal: {
		colors: ["M", "R", "O", "Y", "G", "L", "B", "P"],
		codeNumber: 6,
		turnNumber: 8
	},
	hard: {
		colors: ["M", "R", "O", "Y", "L", "G", "C", "B", "P", "S"],
		codeNumber: 8,
		turnNumber: 8
	}
}

gameModeEasy.addEventListener("click", function() {
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

	// color bank
	bankMagenta.classList.add("no-display");
	bankLime.classList.add("no-display");
	bankCyan.classList.add("no-display");
	bankSienna.classList.add("no-display");

	gameMode = "easy";
	resetGame();
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

	// color bank
	bankMagenta.classList.remove("no-display");
	bankLime.classList.remove("no-display");
	bankCyan.classList.add("no-display");
	bankSienna.classList.add("no-display");

	gameMode = "normal";
	resetGame();
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

	// color bank
	bankMagenta.classList.remove("no-display");
	bankLime.classList.remove("no-display");
	bankCyan.classList.remove("no-display");
	bankSienna.classList.remove("no-display");

	gameMode = "hard";
	resetGame();
	displayTurns();
	gameSetUp();
});

// isGameOver() runs inside checkGuess()
// otherwise "you're out of turns" displays even if you won on the last turn
checkGuessButton.addEventListener("click", function(event) {
	// console.log("check guess btn clicked");
	if(guesses.length != codeNumber) {
		statusDisplay.classList.remove("no-display");
		statusDisplay.textContent = "You're missing at least one guess."
	} else {
		statusDisplay.classList.add("no-display");
		checkGuess();
		displayOldGuesses();
		storeOldGuesses();
		displayCurrentHints();
		storeOldHints();
		displayOldHints()
		turnNumber--;
		displayTurns();
	}
});

resetTurnButton.addEventListener("click", function(event) {
	// console.log("reset btn clicked");
	resetTurn();
});

resetGameButton.addEventListener("click", function(event) {
	// console.log("play again btn clicked");
	resetGame();
	gameSetUp();
})

bankRed.addEventListener("click", function(event) {
	// console.log("bankRed clicked");
	checkButtonFunction.apply(this);
});
bankOrange.addEventListener("click", function(event) {
		// console.log("bankOrange clicked");
	checkButtonFunction.apply(this);
});
bankYellow.addEventListener("click", function(event) {
		// console.log("bankYellow clicked");
	checkButtonFunction.apply(this);
});
bankGreen.addEventListener("click", function(event) {
		// console.log("bankGreen clicked");
	checkButtonFunction.apply(this);
});
bankBlue.addEventListener("click", function(event) {
		// console.log("bankBlue clicked");
	checkButtonFunction.apply(this);
});
bankPurple.addEventListener("click", function a(event) {
		// console.log("bankPurple clicked");
	checkButtonFunction.apply(this);
});
bankMagenta.addEventListener("click", function(event) {
		// console.log("bankMagenta clicked");
	checkButtonFunction.apply(this);
});
bankLime.addEventListener("click", function(event) {
		// console.log("bankLime clicked");
	checkButtonFunction.apply(this);
});
bankCyan.addEventListener("click", function(event) {
		// console.log("bankCyan clicked");
	checkButtonFunction.apply(this);
});
bankSienna.addEventListener("click", function(event) {
		// console.log("bankSienna clicked");
	checkButtonFunction.apply(this);
});

function gameSetUp() {
	code = gameStats.shared.code;
	hints = gameStats.shared.hints;
	guesses = gameStats.shared.guesses;
	guessesArchive = gameStats.shared.guessesArchive;
	guessesArchiveString = gameStats.shared.guessesArchiveString;
	hintsArchive = gameStats.shared.hintsArchive;
	hintsArchiveString = gameStats.shared.hintsArchiveString;
	currentGuess = gameStats.shared.currentGuess;
	isInCode = gameStats.shared.isInCode;
	isExactMatch = gameStats.shared.isExactMatch;
	codeGuessNumber = gameStats.shared.codeGuessNumber;

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

function genCode(codeNumber) {
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
	return code
}

function genNum() {
	var x = (Math.floor(Math.random()*colors.length));
	return x;
}

function checkButtonFunction(){
	if(codeGuessNumber < codeNumber) {
		// console.log(this.textContent);
		currentGuess = this.textContent;
		getGuess();
		createBoxes(guesses, guessesDisplay);
		codeGuessNumber++;
	}
	if(codeGuessNumber == codeNumber) {
		disableColorBank();
	}
}

function getGuess() {
	guesses.push(currentGuess);
}

function checkGuess() {
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
	// console.log("hints:", hints);
	isGameOver();
}

function createBoxes(array, webDisplay) {
	var stringAccumulator = "";
	for(var i = 0; i < array.length; i++) {
		if(array[i] == "R") {
			stringAccumulator += `<div class="boxes red">R</div> `;
		}		
		else if(array[i] == "O") {
			stringAccumulator += `<div class="boxes orange">O</div> `;
		}		
		else if(array[i] == "Y") {
			stringAccumulator += `<div class="boxes yellow">Y</div> `;
		}		
		else if(array[i] == "G") {
			stringAccumulator += `<div class="boxes green">G</div> `;
		}		
		else if(array[i] == "B") {
			stringAccumulator += `<div class="boxes blue">B</div> `;
		}		
		else if(array[i] == "P") {
			stringAccumulator += `<div class="boxes purple">P</div> `;
		}
		else if(array[i] == "M") {
			stringAccumulator += `<div class="boxes magenta">M</div> `;
		}				
		else if(array[i] == "L") {
			stringAccumulator += `<div class="boxes lime">L</div> `;
		}				
		else if(array[i] == "C") {
			stringAccumulator += `<div class="boxes cyan">C</div> `;
		}				
		else if(array[i] == "S") {
			stringAccumulator += `<div class="boxes sienna">S</div> `;
		}
	}
		webDisplay.innerHTML = stringAccumulator + `<br/>`;
}

function storeOldGuesses() {
	guessesArchiveString += guessesArchiveDisplay.innerHTML;
	guessesArchiveDisplay.innerHTML = guessesArchiveString;
}

function displayOldGuesses() {
	guessesArchive.push(guesses);
	guessesArchive.forEach(function(turn) {
		createBoxes(turn, guessesArchiveDisplay);
	});
}

function displayCurrentHints() {
	hints.sort();
	hintsDisplay.innerHTML = hints.join(" ");
}

function storeOldHints() {
	hintsArchiveString += `<div class="hint">${hintsDisplay.innerHTML}</div>`;
}

function displayOldHints() {
	hintsArchiveDisplay.innerHTML = hintsArchiveString;
}

function displayTurns() {
	turnsLeftDisplay.textContent = turnNumber;
}

function isGameOver() {
	if(isExactMatch == 4) {
		displayCode();
		disableColorBank();
		endofGameStatusDisplay();
		resetGameButton.classList.remove("no-display");
		statusDisplay.textContent = "You won!";
	} else if(turnNumber == 0) {
		displayCode();
		disableColorBank();
		endofGameStatusDisplay();
		resetGameButton.classList.remove("no-display");
		statusDisplay.textContent = "You're out of turns.";
	}
}

function disableColorBank() {
		// if(codeGuessNumber == codeNumber) {
		// console.log("You're at the maximum guess number.");
		bankRed.setAttribute("class", "boxes engaged");
		bankOrange.setAttribute("class", "boxes engaged");
		bankYellow.setAttribute("class", "boxes engaged");
		bankGreen.setAttribute("class", "boxes engaged");
		bankBlue.setAttribute("class", "boxes engaged");
		bankPurple.setAttribute("class", "boxes engaged");
		if(gameMode == "normal") {
			bankMagenta.setAttribute("class", "boxes engaged");
			bankLime.setAttribute("class", "boxes engaged");
		}
		if(gameMode == "hard") {
			bankMagenta.setAttribute("class", "boxes engaged");
			bankLime.setAttribute("class", "boxes engaged");
			bankCyan.setAttribute("class", "boxes engaged");
			bankSienna.setAttribute("class", "boxes engaged");
		}
	// }
}

function enableColorBank() {
		bankRed.setAttribute("class", "boxes red");
		bankOrange.setAttribute("class", "boxes orange");
		bankYellow.setAttribute("class", "boxes yellow");
		bankGreen.setAttribute("class", "boxes green");
		bankBlue.setAttribute("class", "boxes blue");
		bankPurple.setAttribute("class", "boxes purple");
		if(gameMode == "normal") {
			bankMagenta.setAttribute("class", "boxes magenta");
			bankLime.setAttribute("class", "boxes lime");
		}
		if(gameMode == "hard") {
			bankMagenta.setAttribute("class", "boxes magenta");
			bankLime.setAttribute("class", "boxes lime");
			bankCyan.setAttribute("class", "boxes cyan");
			bankSienna.setAttribute("class", "boxes sienna");
		}
}

function resetTurn() {
	codeGuessNumber = 0;
	guessesDisplay.textContent = "";
	guesses = [];
	hints = [];
	hintsDisplay.textContent = "";
	isExactMatch = 0;
	isInCode = 0;
	currentGuess = "";
	enableColorBank();
}

function resetGame() {
	resetTurn();
	gameStats.shared.hints = [];
	hintsArchiveString = "";
	hintsArchiveDisplay.textContent = "";
	gameStats.shared.guesses = [];
	gameStats.shared.guessesArchive = [];
	guessesArchiveString = "";
	guessesArchiveDisplay.textContent = "";
	gameStats.shared.code = [];
	codeDisplay.textContent = "";
	codeContainerDisplay.classList.add("no-display");
	statusDisplay.classList.add("no-display");
	resetGameButton.classList.add("no-display");
	checkGuessButton.classList.remove("no-display");
	resetTurnButton.classList.remove("no-display");
}

function endofGameStatusDisplay() {
	checkGuessButton.classList.add("no-display");
	resetTurnButton.classList.add("no-display");
	codeContainerDisplay.classList.remove("no-display");
	statusDisplay.classList.remove("no-display");
}

function displayCode() {
	createBoxes(code, codeDisplay)
}

gameSetUp();
