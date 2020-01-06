class Player {
	/**
	 * @param {Boolean} isHuman determine whether player is human or AI
	 * @param {String} figure which figure player is
	 * @param {Function} board on which map is playing
	 */
	constructor(isHuman, figure, board) {
		this.isHuman = isHuman;
		this.figure = figure;
		this.scores = {
			tie: 0,
			[this.figure]: 1,
			[this.figure === 'x' ? 'o' : 'x']: -1
		};
		this.board_controller = board;
		this.player_position = {
			x: undefined,
			y: undefined
		};
	}

	listen() {
		const move_listener = (str, key) => {
			const int_representation = +key.name;
			if (!Number.isNaN(int_representation) && int_representation >= 0 && int_representation < 10) {
				const formatted_int = int_representation - 1;
				this.player_position.x = Math.trunc(formatted_int / 3);
				this.player_position.y = formatted_int % 3;
				process.stdin.off('keypress', move_listener);
			}
		};
		process.stdin.on('keypress', move_listener);
	}

	minimax(isMaximizing) {
		const result = this.board_controller.getWinner();
		if (result !== null) {
			return this.scores[result];
		}

		let bestScore = isMaximizing ? -Infinity : Infinity;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board.board[i][j] === ' ') {
					board.board[i][j] = isMaximizing ? this.figure : this.figure === 'x' ? 'o' : 'x';
					const score = this.minimax(!isMaximizing);
					board.board[i][j] = ' ';
					bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
				}
			}
		}
		return bestScore;
	}

	checkStep({ Board, row, column, best }) {
		const field = Board.board;
		if (field[i][j] === ' ') {
			field[i][j] = this.figure;
			const score = this.minimax(Board, 0, false);
			field[i][j] = ' ';
			if (score > best) {
				return { score, row, column };
			}
		}
	}

	aiMove(Board) {
		let bestScore = -Infinity;
		let move;
		const field = Board.board;
		for (let row in field) {
			for (let column in field[row]) {
				const result = this.checkStep({
					Board,
					row,
					column,
					bestScore
				});

				if (result) {
					bestScore = result.score;
					move = { x: result.row, y: result.column };
				}
			}
		}
		if (move) {
			Board.board[move.x][move.y] = this.figure;
		}
	}
}

module.exports = Player;
