/* CSS Slider - gulpfile.js
 * ========================
 * Adapted from <https://www.sitepoint.com/simple-gulpy-workflow-sass/>
 */

const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');

const src = 'sass/**/*.scss';
const dest = 'dist';

gulp.task('default', ['sass']);

gulp.task('sass', () => gulp
  .src(src)
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(sourcemaps.write())
  .pipe(autoprefixer())
  .pipe(gulp.dest(dest)));

gulp.task('dist', () => gulp
  .src(src)
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(gulp.dest(dest)));

gulp.task('watch', ['sass'], () => gulp
  .watch(src, ['sass'])
  .on('change', event =>
    console.log(`File ${event.path} was ${event.type}, running tasks...`))); // eslint-disable-line no-console
