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
}

module.exports = Board;
