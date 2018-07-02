const path = require('path');

class ZohoMailRecipe {
	constructor(Franz) {
		this.Franz = Franz;

		this.inject();
		this.monitor();
	}

	inject() {
		this.Franz.injectCSS(path.join(__dirname, 'service.css'));
	}

	monitor() {
		this.Franz.loop(() => this.updateMessegeCount());
	}

	updateMessegeCount() {
		const element = $('#zm_unread');

		if (!element) { return; }

		const title = element.attr('title');

		let count = 0;

		if (title.split(' (').length === 2) {
			const titleValue = title.split(' (')[1].replace(')', '');
			count = parseInt(titleValue, 10);
		}

		// set Franz badge
		this.Franz.setBadge(count);
	};
}

module.exports = (Franz) => new ZohoMailRecipe(Franz);
