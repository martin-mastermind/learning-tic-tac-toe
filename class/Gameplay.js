const Board = require('./Board');

class Gameplay {
	constructor(mode) {
		this.mode = mode;
		this.board = new Board(3);
		this.board.render();
	}

	init() {}
}

module.exports = Gameplay;
