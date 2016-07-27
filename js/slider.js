/**
 * Swipe navigation
 */
;(function() {
	'use strict';

	function setupSlider(slider) {
		var firstSlide = slider.querySelector('ul > li:first-of-type');
		var slides = slider.querySelectorAll('ul > li');
		var radios = Array.prototype.slice.call(slider.querySelectorAll('input'));
		var active;
		var touchStartX;
		var touchStartY;
		var deltaX;
		var deltaY;
		var scrolling;

		function onTouchstart(event) {
			var touch = event.touches ? event.touches[0] : event;
			touchStartX = touch.pageX;
			touchStartY = touch.pageY;
			deltaX = 0;
			deltaY = 0;
			scrolling = undefined;

			active = radios
				.map(function(el) {
					return el.checked;
				})
				.indexOf(true);

			// Add event listeners needed during drag
			slider.addEventListener('touchmove', onTouchmove);
			slider.addEventListener('touchend', onTouchend);
		}

		function onTouchmove(event) {
			var touch = event.touches ? event.touches[0] : event;
			deltaX = touch.pageX - touchStartX;
			deltaY = touch.pageY - touchStartY;

			if (typeof scrolling === 'undefined') {
				scrolling = Math.abs(deltaX) < Math.abs(deltaY);
			}

			if (!scrolling) {
				event.preventDefault();
				Array.prototype.forEach.call(
					slides,
					function(slide) {
						console.log(active)
						slide.style.transition = 'none'; // Disable transitions during dragging
						slide.style.transform = 'translate3d(' + (deltaX - firstSlide.offsetWidth * active) + 'px' + ', 0, 0)';
					}
				);
			}
		}

		function onTouchend(event) {
			var perPage = Math.round(firstSlide.parentNode.clientWidth / firstSlide.offsetWidth);

			if (!scrolling && Math.abs(deltaX) > firstSlide.offsetWidth / 4) {
				var next = Math.max(0, Math.min(radios.length - perPage, deltaX > 0
					? active - (active % perPage || perPage) // Next page to the left
					: active - active % perPage + perPage // Next page to the right
				));
				radios[next].checked = true;
			}
			Array.prototype.forEach.call(
				slides,
				function(slide) {
					slide.style.transition = '';
					slide.style.transform = '';
				}
			);

			// Remove event listeners that are only needed during drag
			slider.removeEventListener('touchmove', onTouchmove);
			slider.removeEventListener('touchend', onTouchend);
		}

		slider.addEventListener('touchstart', onTouchstart);
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
