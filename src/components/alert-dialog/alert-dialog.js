(function(app) {

	var SELECTOR_TRIGGER = '[data-alert-dialog-trigger]';
	var SELECTOR_TRIGGER_ATTR = 'data-alert-dialog-trigger';
	var SELECTOR_ALERT_DIALOG_OVERLAY_ATTR = 'data-alert-dialog-overlay';
	var SELECTOR_ALERT_DIALOG_WINDOW = '[data-alert-dialog-window]';
	var SELECTOR_CLOSE_BUTTON = '[data-alert-dialog-close]';

	app.alertDialog = {
		isSupported: 'querySelector' in document && 'classList' in document.documentElement,
		enhance: enhance
	};

	function enhance() {
		var triggers = document.querySelectorAll(SELECTOR_TRIGGER);

		[].forEach.call(triggers, function(trigger) {
			var triggerName = trigger.getAttribute(SELECTOR_TRIGGER_ATTR);
			var alertDialogOverlay = document.querySelector('[' + SELECTOR_ALERT_DIALOG_OVERLAY_ATTR + '=' + triggerName + ']');
			var alertDialogWindow = alertDialogOverlay.querySelector(SELECTOR_ALERT_DIALOG_WINDOW);
			var closeButton = alertDialogOverlay.querySelector(SELECTOR_CLOSE_BUTTON);

			trigger.addEventListener('click', function() {
				openAlertDialogWindow(alertDialogOverlay, alertDialogWindow, closeButton);
			});

			closeButton.addEventListener('click', function() {
				closeAlertDialogWindow(trigger, alertDialogOverlay);
			});
		});
	}

	function openAlertDialogWindow(alertDialogOverlay, alertDialogWindow, closeButton) {
		alertDialogWindow.addEventListener('keydown', function(e) {
			trapTabkey(e, this);
		});

		// Hide main content from screenreader
		var allContent = document.querySelectorAll('body > *:not(.alert-dialog)');
		[].forEach.call(allContent, function(element) {
			element.setAttribute('aria-hidden', 'true');
		});

		alertDialogOverlay.classList.remove('hidden');
		alertDialogOverlay.setAttribute('aria-hidden', 'false');
		closeButton.focus();
	}

	function closeAlertDialogWindow(trigger, alertDialogOverlay) {
		// Show main content to screenreader again
		var allContent = document.querySelectorAll('body > *:not(.alert-dialog)');
		[].forEach.call(allContent, function(element) {
			element.removeAttribute('aria-hidden');
		});

		alertDialogOverlay.classList.add('hidden');
		alertDialogOverlay.setAttribute('aria-hidden', 'true');
		trigger.focus();
	}

	function trapTabkey(e, alertDialogWindow) {
		var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
		var focusableElementsList = alertDialogWindow.querySelectorAll(focusableElementsString);
		var focusableElements = Array.prototype.slice.call(focusableElementsList);

		var firstTabStop = focusableElements[0];
		var lastTabStop = focusableElements[focusableElements.length - 1];

		// TAB key
		if (e.keyCode === 9) {
			if (e.shiftKey) {
				if (document.activeElement === firstTabStop) {
					e.preventDefault();
					lastTabStop.focus();
				}
			} else {
				if (document.activeElement === lastTabStop) {
					e.preventDefault();
					firstTabStop.focus();
				}
			}
		}
	}

}(window.app = window.app || {}));
