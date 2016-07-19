/**
 * Swipe navigation
 */
;(function() {
	'use strict';

	function setupSlider(slider) {
		var firstSlide = slider.querySelector('ul > li:first-of-type');
		var radios = Array.prototype.slice.call(slider.querySelectorAll('input'));
		var active;
		var touchStartX;
		var deltaX;

		function onTouchstart(event) {
			var touch = event.touches ? event.touches[0] : event;
			touchStartX = touch.pageX;
			deltaX = 0;

			active = radios
				.map(function(el) {
					return el.checked;
				})
				.indexOf(true);

			// Add event listeners needed during drag
			slider.addEventListener('touchmove', onTouchmove);
			slider.addEventListener('touchend', onTouchend);
			slider.addEventListener('mousemove', onTouchmove);
			slider.addEventListener('mouseleave', onTouchend);
			slider.addEventListener('mouseup', onTouchend);
		}

		function onTouchmove(event) {
			var touch = event.touches ? event.touches[0] : event;
			deltaX =  touch.pageX - touchStartX;

			firstSlide.style.transition = 'none'; // Disable transitions during dragging
			firstSlide.style.marginLeft = deltaX - firstSlide.offsetWidth * active + 'px';
		}

		function onTouchend(event) {
			var perPage = Math.round(firstSlide.parentNode.clientWidth / firstSlide.offsetWidth);

			if (Math.abs(deltaX) > firstSlide.offsetWidth / 4) {
				var next = Math.max(0, Math.min(radios.length - perPage, deltaX > 0
					? active - (active % perPage || perPage) // Next page to the left
					: active - active % perPage + perPage // Next page to the right
				));
				radios[next].checked = true;
			}

			firstSlide.style.transition = '';
			firstSlide.style.marginLeft = '';

			// Remove event listeners that are only needed during drag
			slider.removeEventListener('touchmove', onTouchmove);
			slider.removeEventListener('touchend', onTouchend);
			slider.removeEventListener('mousemove', onTouchmove);
			slider.removeEventListener('mouseleave', onTouchend);
			slider.removeEventListener('mouseup', onTouchend);
		}

		slider.addEventListener('touchstart', onTouchstart);
		slider.addEventListener('mousedown', onTouchstart);
	}

	/**
	 * Add swipe navigation to all CSS-Sliders
	 */
	document.addEventListener('DOMContentLoaded', function() {
		Array.prototype.forEach.call(
			document.querySelectorAll('.css-slider'),
			setupSlider
		);
	});
}());
