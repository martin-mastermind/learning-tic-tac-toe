const Board = require('./Board');
const Player = require('./Player');

class Gameplay {
	constructor(mode) {
		this.mode = mode;
		this.board = new Board(3);
		this.players = {};

		if (mode === 'human') {
			this.humanModeInitialization();
		} else {
			this.aiModeInitialization();
		}

		this.cycle();
	}

	humanModeInitialization() {
		this.players.x = new Player(true, 'x', this.board);
		this.players.o = new Player(true, 'o', this.board);
		this.turn = !!Math.round(Math.random()) ? 'x' : 'o';
	}

	aiModeInitialization() {
		const is_human_first = !!Math.round(Math.random());
		this.players.x = new Player(is_human_first, 'x', this.board);
		this.players.o = new Player(!is_human_first, 'o', this.board);
		this.turn = is_human_first ? 'x' : 'o';
	}

	humanControlService() {
		this.players[this.turn].listen();
		this.checkPosition();
	}

	resetPosition(player) {
		player.position = {
			x: undefined,
			y: undefined
		};
	}

	checkPosition() {
		setTimeout(() => {
			const current_player = this.players[this.turn];
			const success_placement = this.board.setPoint(current_player.position, this.turn);
			if (success_placement === undefined) {
				this.checkPosition();
			} else if (!success_placement) {
				this.resetPosition(current_player);
				this.humanControlService();
			} else {
				this.resetPosition(current_player);
				this.turn = this.turn === 'x' ? 'o' : 'x';
				this.cycle();
			}
		}, 60);
	}

	async cycle() {
		this.board.render();
		const winner = await this.board.getWinner();
		if (winner !== null) {
			console.log(winner === 'tie' ? 'Game Tie' : `'${winner}' is won`);
			return;
		}
		const current_player = this.players[this.turn];
		if (current_player.isHuman) {
			this.humanControlService();
		} else {
			await current_player.aiMove(this.board);
			this.turn = this.turn === 'x' ? 'o' : 'x';
			this.cycle();
		}
	}
}

module.exports = Gameplay;
