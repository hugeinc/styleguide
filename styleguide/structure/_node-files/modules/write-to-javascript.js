var fs = require('fs'),
	pathUtil = require('path'),
	basePath = require('./utils').basePath;

module.exports = function() {
	var stream = fs.createWriteStream(basePath + '/styleguide/assets/scripts/styleguide.js'),
		modulesDirectory = basePath + '/styleguide/modules',
		content = [],
		finalContent,
		list = fs.readdirSync(modulesDirectory);

	list.forEach(function(file) {
	  var path = modulesDirectory + "/" + file,
	  	data,
	  	scripts,
	  	stat = fs.statSync(path),
	  	javascriptFile = [];

	  if (stat && stat.isDirectory()) {
	  	data = JSON.parse(fs.readFileSync(path + '/_data.json'));
	  	scripts = data.scripts;
	  	// console.log(scripts)
	  	if(typeof scripts !== 'undefined' && scripts.length) {
	  		scripts.forEach(function(file) {
	  			var filePath = path + '/' + file,
	  				fileContent;
	  			if(fs.existsSync(filePath)) {
	  				fileContent = fs.readFileSync(filePath)
	  				javascriptFile.push(fileContent)
	  			}
	  		})
	  		if(typeof javascriptFile !== 'undefined' && javascriptFile.length > 0) content.push(javascriptFile.join('\n\n'))
	  	}
	  }
	});

	finalContent = content.join('\n\n');

	stream.once('open', function(fd) {
	  stream.write(finalContent);
	  stream.end();
	});
}