/**
 * Concatenate all modules stylesheet
 * files in one main file.
 *
 * This is useful if the user wants to import
 * the complete module code for reuse in a project.
 */
var fs = require('fs'),
  basePath = require('./utils').basePath;

module.exports = function() {
  // TODO: Identify stylesheet extension
  // Do I need to worry about the file extension? what if it is sass or less or stylus?
  var stream = fs.createWriteStream(basePath + '/styleguide/assets/styles/styleguide.scss'),
    modulesDirectory = basePath + '/styleguide/modules',
    content = [],
    finalContent,
    list = fs.readdirSync(modulesDirectory);

  list.forEach(function(file) {
    var path = modulesDirectory + '/' + file,
      stylesheet = file.split('_')[1],
      stat = fs.statSync(path),
      stylesheetFile;

    if (stat && stat.isDirectory()) {
      if (fs.existsSync(path + '/' + stylesheet + '.less')) stylesheetFile = stylesheet + '.less';
      if (fs.existsSync(path + '/' + stylesheet + '.sass')) stylesheetFile = stylesheet + '.sass';
      if (fs.existsSync(path + '/' + stylesheet + '.scss')) stylesheetFile = stylesheet + '.scss';
      if (fs.existsSync(path + '/' + stylesheet + '.styl')) stylesheetFile = stylesheet + '.styl';
      if (typeof stylesheetFile !== 'undefined') content.push('@import "../../modules/' + file + '/' + stylesheetFile + '";');
    }
  });

  finalContent = content.join('\n');

  stream.once('open', function() {
    stream.write(finalContent);
    stream.end();
  });
};
