class Board {
	constructor(size) {
		const row = Array(size).fill(' ');
		this.field = Array(size).fill(row);
	}

	render() {
		process.stdout.write('\u001b[2J\u001b[0;0H');

		this.field.forEach((element, index) => {
			console.log(element.join('|'));
			index !== this.field.length - 1 && console.log('-----');
		});
	}
}

module.exports = Board;
