describe("Mastermind", function() {
  beforeEach(function() {
    this.originalGlobals = {
      colors,
      currentGuess,
    };
  });

  afterEach(function() {
    // TODO: refactor code to be testable without using globals
    const that = this;
    Object.keys(this.originalGlobals).forEach(function(key) {
      window[key] = that.originalGlobals[key];
    });
  });

  it("defaults to easy mode", function() {
    expect(gameMode).toBe("easy");
  });

  it("generates a random number", function() {
    colors = [1,2,3,4];

    const maxTestRuns = 50;
    for (let i = 0; i <= maxTestRuns; i++) {
      const randomNumber = genNum();
      expect(randomNumber).toBeGreaterThanOrEqual(0);
      expect(randomNumber).toBeLessThanOrEqual(3);
      expect(Number.isInteger(randomNumber)).toBe(true);
    }
  });

  it("adds current guess to history of guesses", function() {
    currentGuess = 42;

    expect(guesses).toEqual([]);
    getGuess();
    expect(guesses).toEqual([42]);
  });

});
