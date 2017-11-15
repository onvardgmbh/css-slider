function setupSlider(slider) {
  const firstSlide = slider.querySelector('ul > li:first-of-type');
  const slides = slider.querySelectorAll('ul > li');
  const radios = Array.prototype.slice.call(slider.querySelectorAll('input'));
  const dragListeners = {};
  let touchStartX;
  let touchStartY;
  let deltaX;
  let deltaY;
  let scrollingChecked;

  function getActive() {
    return radios
      .map(el => el.checked)
      .indexOf(true);
  }

  function setActive(index) {
    radios[index].checked = true;
  }

  function onTouchstart(event) {
    const touch = event.touches ? event.touches[0] : event;
    touchStartX = touch.pageX;
    touchStartY = touch.pageY;
    deltaX = 0;
    deltaY = 0;
    scrollingChecked = false;

    // Add event listeners needed during drag
    Object.keys(dragListeners).forEach(eventName =>
      slider.addEventListener(eventName, dragListeners[eventName]));
  }

  function onTouchmove(event) {
    const touch = event.touches ? event.touches[0] : event;
    deltaX = touch.pageX - touchStartX;
    deltaY = touch.pageY - touchStartY;

    if (!scrollingChecked) {
      scrollingChecked = true;
      if (Math.abs(deltaX) < Math.abs(deltaY)) {
        Object.keys(dragListeners).forEach(eventName =>
          slider.removeEventListener(eventName, dragListeners[eventName]));

        return;
      }

      slider.classList.add('moving'); // eslint-disable-line no-param-reassign

      // Disable transitions during swiping
      slides.forEach((slide) => {
        slide.style.transition = 'none'; // eslint-disable-line no-param-reassign
      });
    }

    event.preventDefault();

    const offset = Math.max(0, Math.min(
      slides.length - (firstSlide.parentNode.clientWidth / firstSlide.offsetWidth),
      getActive() + (deltaX / -firstSlide.offsetWidth)
    ));

    slides.forEach((slide) => {
      slide.style.transform = `translate3d(${firstSlide.offsetWidth * -offset}px, 0, 0)`; // eslint-disable-line no-param-reassign
    });
  }

  dragListeners.touchmove = onTouchmove;

  function onTouchend() {
    const perPage = Math.round(firstSlide.parentNode.clientWidth / firstSlide.offsetWidth);

    if (Math.abs(deltaX) > firstSlide.offsetWidth / 4) {
      const active = getActive();
      const next = Math.max(0, Math.min(radios.length - perPage, deltaX > 0
        ? active - (active % perPage || perPage) // Next page to the left
        : active - ((active % perPage) + perPage))); // Next page to the right
      setActive(next);
    }

    slider.classList.remove('moving'); // eslint-disable-line no-param-reassign

    slides.forEach((slide) => {
      slide.style.transition = ''; // eslint-disable-line no-param-reassign
      slide.style.transform = ''; // eslint-disable-line no-param-reassign
    });

    // Remove event listeners that are only needed during drag
    Object.keys(dragListeners).forEach(eventName =>
      slider.removeEventListener(eventName, dragListeners[eventName]));
  }

  dragListeners.touchend = onTouchend;

  slider.addEventListener('touchstart', onTouchstart);
}

/**
 * Add swipe navigation to all CSS-Sliders
 */
document.addEventListener('DOMContentLoaded', () => Array.prototype.forEach.call(
  document.querySelectorAll('.css-slider'),
  setupSlider
));
