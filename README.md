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

## Options
### `$wrap: true`
Show a left arrow to the last page on the first page and vice versa or not.

```scss
@include paginate(2, $wrap: false); // No wrapping arrows on first and last slide
```

### `$scroll-full-page: true`
Arrows scroll either a full page or a single slide.

```scss
@include paginate(2, $scroll-full-page: false); // Arrows scroll single slides
```

## Markup
Markup example in [blade syntax](https://laravel.com/docs/master/blade):
```blade
@php
	$sliderClass = 'css-slider';
	$sliderName = 'slider1';
@endphp

<div class="{{ $sliderClass }}">

	{{-- The radio buttons controlling everything --}}
	@foreach ($slides as $slide)
		<input type="radio" name="{{ $sliderName }}" id="{{ $sliderName }}-{{ $loop->index }}"{{ $loop->index ? '' : ' checked' }}>
	@endforeach

	{{-- The slides --}}
	<ul class="{{ $sliderClass }}__slides">
		@foreach ($slides as $slide)
			<li class="{{ $sliderClass }}__slide">{{ $slide->content }}</li>
		@endforeach
	</ul>

	{{-- Dots to select arbitrary page and see number of pages --}}
	<div class="{{ $sliderClass }}__dots">
		@foreach ($slides as $slide)
			<label class="{{ $sliderClass }}__dot" for="{{ $sliderName }}-{{ $loop->index }}"></label>
		@endforeach
	</div>

	{{-- Arrows to previous page --}}
	<div class="{{ $sliderClass }}__arrows {{ $sliderClass }}__arrows--left">
		@foreach ($slides as $slide)
			<label class="{{ $sliderClass }}__arrow" for="{{ $sliderName }}-{{ $loop->index }}">&larr;</label>
		@endforeach
	</div>

	{{-- Arrows to next page --}}
	<div class="{{ $sliderClass }}__arrows {{ $sliderClass }}__arrows--right">
		@foreach ($slides as $slide)
			<label class="{{ $sliderClass }}__arrow" for="{{ $sliderName }}-{{ $loop->index }}">&rarr;</label>
		@endforeach
	</div>

</div>
```
