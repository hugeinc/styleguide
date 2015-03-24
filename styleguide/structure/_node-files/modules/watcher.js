var watch = require('watch'),
  utils = require('./utils'),
  writeToStylesheet = require('./write-to-stylesheet'),
  writeToJavascript = require('./write-to-javascript');

module.exports = {
  start: function() {
    writeToStylesheet();
    writeToJavascript();

    watch.createMonitor(utils.basePath, function (monitor) {
      monitor.on("created", function (f, stat) {
        if (utils.wasDirectory(false, f) || utils.wasJavascriptOfModule(f) || utils.wasDataOfModule(f)) {
          writeToJavascript();
        }
        if (utils.wasDirectory(false, f) || utils.wasStylesheetOfModule(f)) {
          writeToStylesheet();
        }
      });
      monitor.on("changed", function (f, curr, prev) {
        if (utils.wasDirectory(false, f) || utils.wasJavascriptOfModule(f) || utils.wasDataOfModule(f)) {
          writeToJavascript();
        }
        if (utils.wasDirectory(false, f) || utils.wasStylesheetOfModule(f)) {
          writeToStylesheet();
        }
      });
      monitor.on("removed", function (f, stat) {
        if (utils.wasDirectory(true, f) || utils.wasJavascriptOfModule(f) || utils.wasDataOfModule(f)) {
          writeToJavascript();
        }
        if (utils.wasDirectory(true, f) || utils.wasStylesheetOfModule(f)) {
          writeToStylesheet();
        }
      });
    });
  }
}