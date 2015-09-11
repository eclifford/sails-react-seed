/*!
 * Handle Errors
 * Notify user of errors through gulp-notify
 *
 * Author: Eric Clifford
 *
 */
var notify = require("gulp-notify"),
    argv   = require('yargs').argv;

module.exports = function() {

  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');

  // when not watching we should return proper exit code
  if (!argv.watch) {
    process.exit(1);
  }
};
