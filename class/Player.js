class Player {
	/**
	 * @param {Boolean} isHuman determine whether player is human or AI
	 * @param {String} figure which figure player is
	 */
	constructor(isHuman, figure) {
		this.isHuman = isHuman;
		this.figure = figure;
	}

	off() {
		process.stdin.off('keypress', this.move);
	}

	move(str) {
		console.log(str);
	}

	listen() {
		process.stdin.on('keypress', this.move);
	}
}

module.exports = Player;
