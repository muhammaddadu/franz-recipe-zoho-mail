const path = require('path');

module.exports = (Franz) => {
	const getMessages = function getMessages() {
		const element = $('#zm_unread');

		if (!element) {
			return;
		}

		const title = element.attr('title');

		let count = 0;

		if (title.split(' (').length === 2) {
			const titleValue = title.split(' (')[1].replace(')', '');
			count = parseInt(titleValue, 10);
		}

		// set Franz badge
		Franz.setBadge(count);
	};

	// inject franz.css stylesheet
	Franz.injectCSS(path.join(__dirname, 'service.css'));

	// check for new messages every second and update Franz badge
	Franz.loop(getMessages);
};
