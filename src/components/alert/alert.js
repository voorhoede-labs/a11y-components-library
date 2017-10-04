(function(app) {

	var SELECTOR_TRIGGER = '[data-alert-trigger]';
	var SELECTOR_ALERT_CONTAINER = '[data-alert-container]';

	app.alert = {
		isSupported: 'querySelector' in document && 'classList' in document.documentElement,
		enhance: enhance
	};

	function enhance() {
		var trigger = document.querySelector(SELECTOR_TRIGGER);
		var container = document.querySelector(SELECTOR_ALERT_CONTAINER);
		var alertValue = container.dataset.alertContainer;

		trigger.addEventListener('click', function() {
			container.innerHTML = alertValue;
			container.classList.remove('hidden');
		});
	}

}(window.app = window.app || {}));
