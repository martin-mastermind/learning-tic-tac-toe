/*
    V1. Main menu (select mode - PVP or PVE)
    2. Game
        V2.1. Board
        V2.2. Players
        V2.3. Turn-based mechanic
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
				new Gameplay(mode);
			})
			.catch(status => {
				process.exit(status);
			});
	}
}

const main_game = new Game();
main_game.play();
