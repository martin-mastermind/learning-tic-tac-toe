class Menu {
	constructor() {
		const readline = require('readline');

		readline.emitKeypressEvents(process.stdin);
		process.stdin.setRawMode(true);

		process.stdin.on('keypress', (str, key) => key.ctrl && key.name === 'c' && process.exit());
	}

	clear() {
		process.stdout.write('\u001b[2J\u001b[0;0H');
	}

	print() {
		console.log('***********');
		console.log('1. Versus human');
		console.log('2. Versus AI');
		console.log('3. Exit');
		console.log('***********');
	}

	async show() {
		this.clear();
		return new Promise((resolve, reject) => {
			this.print();

			const menu_controller = str => {
				process.stdin.off('keypress', menu_controller);
				this.clear();

				switch (str) {
					case '1':
						resolve('human');
						break;
					case '2':
						resolve('ai');
						break;
					case '3':
						reject(0);
						break;
					default:
						process.stdin.on('keypress', menu_controller);
				}
			};

			process.stdin.on('keypress', menu_controller);
		});
	}
}

module.exports = Menu;
