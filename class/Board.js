class Board {
	constructor(size) {
		const row = Array(size);
		this.field = Array(size).fill(row);
	}
}

module.exports = Board;
