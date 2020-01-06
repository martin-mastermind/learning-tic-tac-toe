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
		this.position = {
			x: undefined,
			y: undefined
		};
	}

	listen() {
		const move_listener = (str, key) => {
			const int_representation = +key.name;
			if (!Number.isNaN(int_representation) && int_representation >= 0 && int_representation < 10) {
				const formatted_int = int_representation - 1;
				this.position.x = Math.trunc(formatted_int / 3);
				this.position.y = formatted_int % 3;
				process.stdin.off('keypress', move_listener);
			}
		};
		process.stdin.on('keypress', move_listener);
	}

	async minimax(isMaximizing) {
		const result = await this.board_controller.getWinner();
		if (result !== null) {
			return this.scores[result];
		}

		let bestScore = isMaximizing ? -Infinity : Infinity;

		const availables = this.board_controller.getEmptyPoints();
		const figure = isMaximizing ? this.figure : this.figure === 'x' ? 'o' : 'x';

		for (let serie of availables) {
			for (let column of serie.cols) {
				bestScore = await this.checkStep({
					row: serie.row,
					column,
					best: bestScore,
					figure,
					mode: isMaximizing
				});
			}
		}
		return bestScore;
	}

	async checkStep({ row, column, best, figure, mode }) {
		const field = this.board_controller.board;
		field[row][column] = figure;
		const score = await this.minimax(mode !== 'ai' ? !mode : false);
		field[row][column] = ' ';
		if (mode === 'ai') {
			return score > best ? { score, row, column } : undefined;
		}

		return mode ? Math.max(score, best) : Math.min(score, best);
	}

	async aiMove() {
		let bestScore = -Infinity;
		let move;
		const availables = this.board_controller.getEmptyPoints();
		for (let serie of availables) {
			for (let column of serie.cols) {
				const result = await this.checkStep({
					row: serie.row,
					column,
					best: bestScore,
					figure: this.figure,
					mode: 'ai'
				});

				if (result) {
					bestScore = result.score;
					move = { x: result.row, y: result.column };
				}
			}
		}
		if (move) {
			this.board_controller.board[move.x][move.y] = this.figure;
		}
	}
}

module.exports = Player;
