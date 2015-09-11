/*!
 * SASS Task
 * Task building SASS with node-sass + autoprefixing + source maps
 *
 * https://github.com/dlmanning/gulp-sass
 * https://github.com/postcss/autoprefixer
 * https://github.com/floridoo/gulp-sourcemaps
 *
 * Author: Eric Clifford
 *
 */
var gulp          = require('gulp'),
    watch         = require('gulp-watch'),
    browserSync   = require('browser-sync'),
    sass          = require('gulp-sass'),
    minifyCss     = require('gulp-minify-css'),
    autoprefixer  = require('gulp-autoprefixer'),
    gulpif        = require('gulp-if'),
    argv          = require('yargs').argv,
    handleErrors  = require('./util/handleErrors');

if (argv.watch) {
   watch(['app/**/*.scss'], function() {
     gulp.start('sass');
   });
}

gulp.task('sass', function () {
  gulp.src(['app/app.scss'])
    .pipe(sass({
        includePaths: [
          './node_modules'
        ]
     }))
    .on('error', handleErrors)
    .pipe(autoprefixer({ browsers: ['> 1%','last 2 version'] }))
    .pipe(gulpif(argv.production, minifyCss()))
    .pipe(gulp.dest('./.tmp/public'))
    .pipe(browserSync.stream());
});
