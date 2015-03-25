/**
 * Watch changed fils
 * and decides when to recompile
 * main javascript or stylesheet files.
 */
var watch = require('watch'),
  utils = require('./utils'),
  writeToStylesheet = require('./write-to-stylesheet'),
  writeToJavascript = require('./write-to-javascript'),
  writeDate = require('./write-date');

module.exports = {
  start: function() {
    writeToStylesheet();
    writeToJavascript();
    writeDate();

    watch.createMonitor(utils.basePath, function(monitor) {
      monitor.on('created', function(f) {
        if (utils.wasDirectory(false, f) || utils.wasJavascriptOfModule(f) || utils.wasDataOfModule(f)) {
          writeToJavascript();
        }
        if (utils.wasDirectory(false, f) || utils.wasStylesheetOfModule(f)) {
          writeToStylesheet();
        }
      });
      monitor.on('changed', function(f) {
        if (utils.wasDirectory(false, f) || utils.wasJavascriptOfModule(f) || utils.wasDataOfModule(f)) {
          writeToJavascript();
        }
        if (utils.wasDirectory(false, f) || utils.wasStylesheetOfModule(f)) {
          writeToStylesheet();
        }
      });
      monitor.on('removed', function(f) {
        if (utils.wasDirectory(true, f) || utils.wasJavascriptOfModule(f) || utils.wasDataOfModule(f)) {
          writeToJavascript();
        }
        if (utils.wasDirectory(true, f) || utils.wasStylesheetOfModule(f)) {
          writeToStylesheet();
        }
      });
    });
  }
};
