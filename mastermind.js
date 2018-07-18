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

function startGame() {
	genCode();
	populateCode();
	resetGame();
}

var colors = ["R", "O", "Y", "G", "B", "P"];
var code = [];
var tempCode = [];

// genCodeWhile if codeNumber > colors.length
// because we're using colors.length as a 
// a limiter on the random number generator
// and also requiring unique numbers, so it literally
// has spaces that can't be filled
// TODO: create an option for more colors and a longer code to break
var codeNumber = 4;

function genCode() {

	while(tempCode.length < codeNumber) {
		var colorSelector = genNum();
		if(tempCode.includes(colorSelector)) {
			// console.log("tempCode includes " + colorSelector);
			// ...do I need to do something on the true condition?
		} else {
			tempCode.push(colorSelector);		
		};
	}
	console.log(tempCode);
	return tempCode;
}

function populateCode() {
	tempCode.forEach(function(el) {
		code.push(colors[el]);
	});
		console.log(code);
}

// this potentially isn't very flexible if we want a bigger code
// because it's dependent on the length colors array
function genNum() {
	var x = (Math.floor(Math.random()*colors.length));
	return x;
}

function resetGame() {
	tempCode = [];
	code = [];
}