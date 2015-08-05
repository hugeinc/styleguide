/**
 * Concatenate all modules javascript
 * files in one main file.
 *
 * This is useful if the user wants to import
 * the complete module code for reuse in a project.
 */
var fs = require('fs'),
  basePath = require('./utils').basePath;

module.exports = function() {
  var stream = fs.createWriteStream(basePath + '/styleguide/assets/scripts/styleguide.js'),
    modulesDirectory = basePath + '/styleguide/modules',
    content = [],
    finalContent,
    list = fs.readdirSync(modulesDirectory);

  list.forEach(function(file) {
    var path = modulesDirectory + '/' + file,
      hasData,
      data,
      scripts,
      stat = fs.statSync(path),
      javascriptFile = [];

    if (stat && stat.isDirectory()) {
      hasData = fs.existsSync(path + '/_data.json');

      if(hasData) {
        data = JSON.parse(fs.readFileSync(path + '/_data.json'));
        scripts = data.scripts;

        if (typeof scripts !== 'undefined' && scripts.length) {
          scripts.forEach(function(file) {
            var filePath = path + '/' + file,
                fileContent;

            if (fs.existsSync(filePath)) {
              fileContent = fs.readFileSync(filePath);
              javascriptFile.push(fileContent);
            }
          });
          if (typeof javascriptFile !== 'undefined' && javascriptFile.length > 0) content.push(javascriptFile.join('\n\n'));
        }
      }
    }
  });

  finalContent = content.join('\n\n');

  stream.once('open', function() {
    stream.write(finalContent);
    stream.end();
  });
};
