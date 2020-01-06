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
		if (typeof x === 'undefined' || typeof y === 'undefined') return false;

		const is_empty = this.board[x][y] === ' ';
		this.board[x][y] = is_empty ? figure : this.board[x][y];

		return is_empty;
	}

	lineCheck(line) {
		const formatted = line.join('');
		return formatted === 'xxx' || formatted === 'ooo';
	}

	getWinner() {
		let result = [];
		const diag_array = [
			[this.board[0][0], this.board[1][1], this.board[2][2]],
			[this.board[0][2], this.board[1][1], this.board[2][0]]
		];
		const iterateAround = iterable => {
			for (let row of iterable) {
				if (this.lineCheck(row)) {
					result = row;
					break;
				}
			}
		};
		iterateAround(this.board);
		iterateAround(diag_array);
		for (let i = 0; i < this.board.length; i++) {
			const row = this.board.map(element => element[i]);
			if (this.lineCheck(row)) {
				result = row;
				break;
			}
		}
		console.log({
			map: this.board,
			result: result.length === 0 ? (this.full() ? 'tie' : null) : result[0]
		});
		return result.length === 0 ? (this.full() ? 'tie' : null) : result[0];
	}

	full() {
		return !this.board.some(row => row.includes(' '));
	}
}

module.exports = Board;
