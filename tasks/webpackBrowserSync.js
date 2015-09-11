var gulp = require('gulp');
var webpack = require('webpack');
var browserSync = require('browser-sync');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./config/webpack');

gulp.task('webpackBrowserSync', function(callback) {
  var bundler = webpack(config);

  browserSync({
    proxy: {
      target: "127.0.0.1:1337",
      middleware: [
        webpackDevMiddleware(bundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: config.output.path,

          stats: config.stats,

          // hot: true,
          historyApiFallback: true

          // for other settings see
          // http://webpack.github.io/docs/webpack-dev-middleware.html
        }),

        // bundler should be the same as above
        webpackHotMiddleware(bundler)
      ]
    }
  }, callback);
});
