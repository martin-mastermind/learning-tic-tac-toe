const Board = require('./Board');

class Gameplay {
	constructor(mode) {
		this.mode = mode;
		this.board = new Board(3);
		this.init();
	}

	init() {
		this.board.render();
	}
}

module.exports = Gameplay;
