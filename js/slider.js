function setupSlider(slider) {
  const firstSlide = slider.querySelector('ul > li:first-of-type');
  const slideContainer = slider.querySelector('ul[class*="__slides"]');
  const slides = Array.prototype.slice.call(slider.querySelectorAll('ul > li'));
  const radios = Array.prototype.slice.call(slider.querySelectorAll('input'));
  const arrows = {
    previous: Array.prototype.slice.call(slider.querySelectorAll('*[class*="__arrows--left"] > label[class*="__arrow"]')),
    next: Array.prototype.slice.call(slider.querySelectorAll('*[class*="__arrows--right"] > label[class*="__arrow"]')),
  };
  const dragListeners = {};
  let touchStartX;
  let touchStartY;
  let deltaX;
  let deltaY;
  let scrollingChecked;

  function getWidth(el /*: HTMLElement */) /*: number */ {
    return +window.getComputedStyle(el).width.slice(0, -2);
  }

  function getSlidesPerPage() /*: number */ {
    return slides.length < 1 ? 0 : Math.round(getWidth(slider) / getWidth(slides[0]));
  }

  function getPageCount() /*: number */ {
    return Math.ceil(slides.length / getSlidesPerPage());
  }

  function getActiveSlide() /*: number */ {
    return radios
      .map(el => el.checked)
      .indexOf(true);
  }

  function setActiveSlide(slideIndex /*: number */) {
    radios[slideIndex].checked = true;
  }

  function getActivePage() /*: number */ {
    const activeSlideIndex = getActiveSlide();
    return activeSlideIndex === slides.length - 1 ? -1 // TODO -1 for other slides on last page
      : Math.floor(activeSlideIndex / getSlidesPerPage());
  }

  function setActivePage(pageIndex /*: number */) {
    const normalizedIndex = pageIndex < 0 ? getPageCount() - pageIndex : pageIndex;
    setActiveSlide(normalizedIndex === getPageCount() - 1
      ? slides.length - 1 //  On the last page, focus the last slide
      : normalizedIndex * getSlidesPerPage()); // On other pages, focus first slide on page
  }

  function getPageWithSlide(slide /*: HTMLElement */) /*: number */ {
    const spp = getSlidesPerPage();
    const i = slides.indexOf(slide);
    return Math.floor(i / spp); //TODO
  }

  function nextPage() {
    setActiveSlide(arrows.next.findIndex(el =>
      window.getComputedStyle(el).display === 'block'));
  }

  function previousPage() {
    setActiveSlide(arrows.previous.findIndex(el =>
      window.getComputedStyle(el).display === 'block'));
  }

  // DEBUG Make functions available for testing in browser console
  window.getWidth = getWidth;
  window.getSlidesPerPage = getSlidesPerPage;
  window.getPageCount = getPageCount;
  window.getActiveSlide = getActiveSlide;
  window.setActiveSlide = setActiveSlide;
  window.getActivePage = getActivePage;
  window.setActivePage = setActivePage;
  window.getPageWithSlide = getPageWithSlide;
  window.nextPage = nextPage;
  window.previousPage = previousPage;

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

      slider.classList.add('moving');

      // Disable transitions during swiping
      slides.forEach((slide) => {
        slide.style.transition = 'none';
      });
    }

    event.preventDefault();

    const offset = Math.max(0, Math.min(
      slides.length - (firstSlide.parentNode.clientWidth / firstSlide.offsetWidth),
      getActiveSlide() + (deltaX / -firstSlide.offsetWidth)
    ));

    slides.forEach((slide) => {
      slide.style.transform = `translate3d(${firstSlide.offsetWidth * -offset}px, 0, 0)`;
    });
  }

  dragListeners.touchmove = onTouchmove;

  function onTouchend() {
    const perPage = Math.round(firstSlide.parentNode.clientWidth / firstSlide.offsetWidth);

    if (Math.abs(deltaX) > firstSlide.offsetWidth / 4) {
      const active = getActiveSlide();
      const next = Math.max(0, Math.min(radios.length - perPage, deltaX > 0
        ? active - (active % perPage || perPage) // Next page to the left
        : active - ((active % perPage) + perPage))); // Next page to the right
      setActiveSlide(next);
    }

    slider.classList.remove('moving');

    slides.forEach((slide /*: HTMLElement */) => {
      slide.style.transition = '';
      slide.style.transform = '';
    });

    // Remove event listeners that are only needed during drag
    Object.keys(dragListeners).forEach(eventName =>
      slider.removeEventListener(eventName, dragListeners[eventName]));
  }

  dragListeners.touchend = onTouchend;

  slider.addEventListener('touchstart', onTouchstart);

  function onFocus(i /*: number */) /*: function */ {
    return (event /*: FocusEvent */) => {
      console.log(`focus on slide #${i} active: ${getActiveSlide()} s/p: ${getSlidesPerPage()} should be page ${getPageWithSlide(slides[i])}`);
      const targetPage = getPageWithSlide(slides[i]);
      const spp = getSlidesPerPage();
      if (getActiveSlide() !== targetPage * spp && (i < slides.length - spp || getActiveSlide() < slides.length - 1)) {
        setActiveSlide(spp * targetPage);
        slideContainer.scrollLeft = 0; // Reset the browsers native "scroll into view"
      }
    };
  }

  slides.forEach((slide /*: HTMLElement */, i /*: number */) => {
    slide.addEventListener('focus', onFocus(i), true);
  });

  // TODO DEBUG
  window.slider = slider;
  window.slides = slides;
  window.radios = radios;
}

/**
 * Add swipe navigation to all CSS-Sliders
 */
document.addEventListener('DOMContentLoaded', () => Array.prototype.forEach.call(
  document.querySelectorAll('.css-slider'),
  setupSlider
));
