var gulp = require('gulp');
var webpack = require('webpack');
var gutil = require('gulp-util');
var config = require('./config/webpack');

gulp.task('webpackBundle', function(callback) {
  var bundler = webpack(config);
  function bundle(err, stats) {
    if (err) {
      notify({message: err});
    }
    if (argv.verbose) {
      gutil.log('[webpack]', stats.toString({modules: true, colors: true}));
    } else {
      gutil.log('[webpack]', stats.toString({modules: false, source: false, chunks: false, chunkModules: false, colors: true}));
    }
    return callback();
  }
});
