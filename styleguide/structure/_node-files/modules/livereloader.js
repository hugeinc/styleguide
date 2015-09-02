/**
 * Livereload server
 * It has its own watcher.
 * Livereload connects with the livereload.js file
 * in the Front-End.
 */
var livereload = require('livereload'),
  basePath = require('./utils').basePath;

module.exports = {
  start: function() {
    server = livereload.createServer({
      port: 8374,
      exts: ['js', 'jade', 'json', 'css', 'less', 'sass', 'scss', 'styl', 'svg', 'png', 'jpg', 'gif']
    });
    server.watch(basePath);
  }
};
