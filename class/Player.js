class Player {
	/**
	 * @param {Boolean} isHuman determine whether player is human or AI
	 * @param {String} figure which figure player is
	 */
	constructor(isHuman, figure) {
		this.isHuman = isHuman;
		this.figure = figure;
		this.scores = {
			tie: 0,
			[this.figure]: 1,
			[this.figure === 'x' ? 'o' : 'x']: -1
		};
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

	minimax(board, depth, isMaximizing) {
		const result = board.getWinner();
		if (result !== null) {
			return this.scores[result];
		}

		let bestScore = isMaximizing ? -Infinity : Infinity;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (board.board[i][j] === ' ') {
					board.board[i][j] = isMaximizing ? this.figure : this.figure === 'x' ? 'o' : 'x';
					const score = this.minimax(board, depth + 1, !isMaximizing);
					board.board[i][j] = ' ';
					bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
				}
			}
		}
		return bestScore;
	}

	aiMove(Board) {
		// AI to make its turn
		let bestScore = -Infinity;
		let move;
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				// Is the spot available?
				if (Board.board[i][j] === ' ') {
					Board.board[i][j] = this.figure;
					const score = this.minimax(Board, 0, false);
					Board.board[i][j] = ' ';
					if (score > bestScore) {
						bestScore = score;
						move = { i, j };
					}
				}
			}
		}
		if (move) {
			Board.board[move.i][move.j] = this.figure;
		}
	}
}

module.exports = Player;
