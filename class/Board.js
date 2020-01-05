class Board {
	constructor(size) {
		const row = Array(size).fill(' '); // check git configuration
		this.field = Array(size).fill(row);
	}

	render() {
		this.field.forEach((element, index) => {
			console.log(element.join('|'));
			index !== this.field.length - 1 && console.log('-----');
		});
	}
}

module.exports = Board;
