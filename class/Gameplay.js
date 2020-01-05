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

	checkPosition() {
		setTimeout(() => {
			if (!this.board.setPoint(this.players[this.turn].player_position, this.turn)) {
				this.checkPosition();
			} else {
				this.board.render();
			}
		}, 60);
	}

	init() {
		this.board.render();
		this.players[this.turn].listen();
		this.checkPosition();
	}
}

module.exports = Gameplay;
