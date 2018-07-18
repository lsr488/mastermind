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

function init() {

}

var colors = ["R", "O", "Y", "G", "B", "P"];
var code = [];

// genCodeWhile if codeNumber > colors.length
// because we're using colors.length as a 
// a limiter on the random number generator
// and also requiring unique numbers, so it literally
// has spaces that can't be filled
// TODO: create an option for more colors and a longer code to break
var codeNumber = 4;

// generate solution colors
// create new array
	// generate random numbers to copy colors elements to
	// the code array, but no repeats
	// code = colors.slice(i, i+1)

// this isn't very flexible for larger code sets
function genCode() {
	var tempCode = [];
	while(tempCode.length < codeNumber) {
		// console.log("tempCode Length:", tempCode.length);
		var colorSelector = genNum();
		if(tempCode.includes(colorSelector)) {
			// console.log('tempCode:', tempCode);
			// console.log('colorSelector:', colorSelector);
			// console.log("tempCode includes " + colorSelector);
			// ...do I need to do something on the true condition?
		} else {
			// console.log("num to push:", colorSelector);
			tempCode.push(colorSelector);		
		};
	// console.log(tempCode);
	// while(tempCode.length > codeNumber) {
	// 	console.log("tempCode is too long.")
	// 	console.log(tempCode.pop());
	// }
	}
	console.log(tempCode);
}
// compare each colorSelector against each value of tempCode
	// if false (no match), push to tempCode
	// if true, ... return? do another colorSelector?
function genNum() {
	var x = (Math.floor(Math.random()*colors.length + 1));
	return x;
}