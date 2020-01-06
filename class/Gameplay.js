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
			this.players.x = new Player(is_human_first, 'x', this.board);
			this.players.o = new Player(!is_human_first, 'o', this.board);
			this.turn = is_human_first ? 'x' : 'o';
		}

		this.cycle();
	}

	checkPosition() {
		setTimeout(() => {
			if (!this.board.setPoint(this.players[this.turn].player_position, this.turn)) {
				this.checkPosition();
			} else {
				this.turn = this.turn === 'x' ? 'o' : 'x';
				this.cycle();
			}
		}, 60);
	}

	cycle() {
		this.board.render();
		const winner = this.board.getWinner();
		if (winner !== null) {
			console.log(winner === 'tie' ? 'Game Tie' : `'${winner}' is won`);
		} else {
			const current_player = this.players[this.turn];
			if (current_player.isHuman) {
				current_player.listen();
				this.checkPosition();
			} else {
				current_player.aiMove(this.board);
				this.turn = this.turn === 'x' ? 'o' : 'x';
				this.cycle();
			}
		}
	}
}

module.exports = Gameplay;
