class Player {
	/**
	 * @param {Boolean} isHuman determine whether player is human or AI
	 * @param {String} figure which figure player is
	 */
	constructor(isHuman, figure) {
		this.isHuman = isHuman;
		this.figure = figure;
		this.player_position = {
			x: undefined,
			y: undefined
		};
	}

	listen() {
		const move_listener = (str, key) => {
			const int_representation = +key.name;
			if (!Number.isNaN(int_representation) && int_representation >= 0 && int_representation < 10) {
				this.player_position.x = Math.trunc(int_representation / 4);
				this.player_position.y = int_representation % 4 === 0 ? 0 : (int_representation % 4) - 1;
				process.stdin.off('keypress', move_listener);
			}
		};
		process.stdin.on('keypress', move_listener);
	}
}

module.exports = Player;
