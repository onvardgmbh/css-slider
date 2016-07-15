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

## TODO
- Arrow right to last page shown in some off-grid cases it shouldn't

## Notes

### Last page overlap
n: 4, num: 8/7/6/5

```
o  1,8   0  o  1,7   0    o  1,6   0  o  1,5   0
|  2,7   1  |  2,6   1    |  2,5   1  |o 2,4 0 1
|  3,6   2  |  3,5   2    |o 3,4 0 2  || 3,3 1 2
|  4,5   3  |o 4,4 0 3    || 4,3 1 3  || 4,2 2 3
o  5,4 0 0   | 5,3 1 0     | 5,2 2 0   | 5,1 3 0
|  6,3 1 1   | 6,2 2 1     | 6,1 3 1
|  7,2 2 2   | 7,1 3 2
|  8,1 3 3
```
