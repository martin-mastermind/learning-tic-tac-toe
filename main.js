/*
    1. Main menu (select mode - PVP or PVE)
    2. Game
        2.1. Board
        2.2. Players
        2.3. Turn-based mechanic
        2.4. Checker for conditions
        2.5. AI
*/

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
				const gameplay = new Gameplay(mode);
				gameplay.init();
			})
			.catch(status => {
				process.exit(status);
			});
	}
}

const main_game = new Game();
main_game.play();
