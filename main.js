const Menu = require('./class/Menu');
const Gameplay = require('./class/Gameplay');

class Game {
	constructor() {
		this.menu = new Menu();
	}

	play() {
		this.menu
			.show()
			.then(mode => {
				new Gameplay(mode);
			})
			.catch(status => {
				process.exit(status);
			});
	}
}

const main_game = new Game();
main_game.play();
