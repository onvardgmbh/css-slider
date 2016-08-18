CSS Slider
==========

Plain CSS Slider with responsive pagination.

## Basic usage

```scss
@import 'css-slider';

.your-slider-class {
	@include slider-base();

	@include paginate(2); // Or however many columns you want
}
```
## Responsive usage

```scss
@import 'css-slider';

.your-slider-class {
	@include slider-base();

	@media (max-width: 600px) {
		@include paginate(1);
	}

	@media (min-width: 601px) {
		@include paginate(3);
	}
}
```

## `$wrap: true`
Show a left arrow to the last page on the first page and vice versa or not.

```scss
@include paginate(2, $wrap: false); // No wrapping arrows on first and last slide
```

## `$scroll-full-page: true`
Arrows scroll either a full page or a single slide.

```scss
@include paginate(2, $scroll-full-page: false); // Arrows scroll single slides
```

## TODO
- Arrow right to last page shown in some off-grid cases it shouldn't
- Single slide mode sliding last page too far if `input:nth-last-child(-n+#{$n-1}):checked`
- Mobile swipe script always slides full pages
- Make `$wrap` and `$scroll-full-page` configurable by setting a class instead of passing params
