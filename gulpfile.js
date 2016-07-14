/* CSS Slider - gulpfile.js
 * Adapted from <https://www.sitepoint.com/simple-gulpy-workflow-sass/>
 */

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const src = 'sass/**/*.scss';
const dest = 'dist';

gulp.task('sass', function() {
	return gulp
		.src(src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(sourcemaps.write())
		.pipe(autoprefixer())
		.pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
	return gulp
		.watch(src, ['sass'])
		.on('change', function(event) {
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		});
});
