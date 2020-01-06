class Board {
	constructor(size) {
		this.board = [];
		for (let i = 0; i < size; i++) {
			this.board.push(new Array(size).fill(' '));
		}
	}

	render() {
		process.stdout.write('\u001b[2J\u001b[0;0H');

		this.board.forEach((element, index) => {
			console.log(element.join('|'));
			index !== this.board.length - 1 && console.log('-----');
		});
	}

	setPoint({ x, y }, figure) {
		if (typeof x === 'undefined' || typeof y === 'undefined') return undefined;

		const is_empty = this.board[x][y] === ' ';
		this.board[x][y] = is_empty ? figure : this.board[x][y];

		return is_empty;
	}

	lineCheck(line) {
		const formatted = line.join('');
		return formatted === 'xxx' || formatted === 'ooo';
	}

	iterateAround = (iterable, result) => {
		iterable.forEach(row => {
			result = this.lineCheck(row) && result.length === 0 ? row : result;
		});
	};

	getDiagonals() {
		return [
			[this.board[0][0], this.board[1][1], this.board[2][2]],
			[this.board[0][2], this.board[1][1], this.board[2][0]]
		];
	}

	getVerticals() {
		return this.board.map((_, index) => this.board.map(column => column[index]));
	}

	getWinner() {
		let result = [];

		this.iterateAround(this.board, result);
		this.iterateAround(this.getDiagonals(), result);
		this.iterateAround(this.getVerticals(), result);

		return result.length === 0 ? (this.full() ? 'tie' : null) : result[0];
	}

	getEmptyPoints() {
		if (this.full()) return [];

		return this.board
			.map((row, r_index) => {
				const result_obj = row
					.map((col, c_index) => (col === ' ' ? c_index : undefined))
					.filter(element => element !== undefined);
				return result_obj ? { cols: result_obj, row: r_index } : undefined;
			})
			.filter(serie => serie.cols.length > 0);
	}

	full() {
		return !this.board.some(row => row.includes(' '));
	}
}

module.exports = Board;
