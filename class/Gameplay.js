const Board = require('./Board');
const Player = require('./Player');

class Gameplay {
	constructor(mode) {
		this.mode = mode;
		this.board = new Board(3);
		this.players = {};

		if (mode === 'human') {
		} else {
			const is_human_first = !!Math.round(Math.random());
			this.players.x = new Player(is_human_first, 'x');
			this.players.o = new Player(!is_human_first, 'o');
			this.turn = is_human_first ? 'x' : 'o';
		}

		this.init();
	}

	init() {
		this.board.render();
		this.players[this.turn].listen();
	}
}

module.exports = Gameplay;
