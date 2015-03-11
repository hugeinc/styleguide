var watcher = require('watch'),
	fs = require('fs'),
	pathUtil = require('path'),
	livereload = require('livereload'),
	basePath = __dirname + '/../../..',
	sys = require('sys'),
	exec = require('child_process').exec;

function puts(error, stdout, stderr) { sys.puts(stdout) }

function wasDirectory(removed, f) {
	var filenameArray, filename;
	if (!removed) {
		return fs.lstatSync(f).isDirectory()
	} else {
		filenameArray = f.split('/')
		filename = filenameArray[filenameArray.length - 1]
		return filename.indexOf('_') == 1 && filename.indexOf('.') == -1
	}
}

function wasDataOfModule(f) {
	// console.log('data of module: ', f, f.indexOf('modules') !== -1 && f.indexOf('_data.json') !== -1)
	return f.indexOf('modules') !== -1 && f.indexOf('_data.json') !== -1
}

function wasJavascriptOfModule(f) {
	// console.log('javascript of module: ', f, pathUtil.extname(f), f.indexOf('modules') !== -1 && pathUtil.extname(f) === '.js')
	return f.indexOf('modules') !== -1 && pathUtil.extname(f) === '.js'
}

function wasStylesheetOfModule(f) {
	var ext = pathUtil.extname(f)
	// console.log('stylehseet of module: ', f, pathUtil.extname(f), f.indexOf('modules') !== -1 && (ext === '.scss' || ext === '.sass' || ext === '.less' || ext === '.styl'))
	return f.indexOf('modules') !== -1 && (ext === '.scss' || ext === '.sass' || ext === '.less' || ext === '.styl')
}

function writeToStylesheet() {
	// do I need to worry about the file extension? what if it is sass or less or stylus?
	var stream = fs.createWriteStream(basePath + '/styleguide/assets/styles/styleguide.scss'),
		modulesDirectory = basePath + '/styleguide/modules',
		content = [],
		finalContent,
		list = fs.readdirSync(modulesDirectory);

	list.forEach(function(file) {
	  var path = modulesDirectory + "/" + file,
	  	stylesheet = file.split('_')[1],
	  	stat = fs.statSync(path),
	  	stylesheetFile;

	  if (stat && stat.isDirectory()) {
	  	if(fs.existsSync(path + '/' + stylesheet + '.less')) stylesheetFile = stylesheet + '.less'
	  	if(fs.existsSync(path + '/' + stylesheet + '.sass')) stylesheetFile = stylesheet + '.sass'
	  	if(fs.existsSync(path + '/' + stylesheet + '.scss')) stylesheetFile = stylesheet + '.scss'
	  	if(fs.existsSync(path + '/' + stylesheet + '.styl')) stylesheetFile = stylesheet + '.styl'
	  	if(typeof stylesheetFile !== 'undefined') content.push('@import "../../modules/' + file + '/' + stylesheetFile + '";')
	  }
	});

	finalContent = content.join('\n');

	stream.once('open', function(fd) {
	  stream.write(finalContent);
	  stream.end();
	});
}

function writeToJavascript() {
	// do I need to worry about the file extension? what if it is sass or less or stylus?
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

writeToStylesheet()
writeToJavascript()

server = livereload.createServer({
	exts: ['js', 'jade', 'json', 'css', 'less', 'sass', 'scss', 'styl', 'svg', 'png', 'jpg', 'gif'],
	exclusions: ['styleguide.scss', 'styleguide.less', 'styleguide.sass', 'styleguide.styl', 'styleguide.js']
});
server.watch(basePath);

watcher.createMonitor(basePath, function (monitor) {
  monitor.on("created", function (f, stat) {
    if (wasDirectory(false, f) || wasJavascriptOfModule(f) || wasDataOfModule(f)) {
    	writeToJavascript();
    }
   	if (wasDirectory(false, f) || wasStylesheetOfModule(f)) {
    	writeToStylesheet();
    }
  })
  monitor.on("changed", function (f, curr, prev) {
    if (wasDirectory(false, f) || wasJavascriptOfModule(f) || wasDataOfModule(f)) {
    	writeToJavascript();
    }
   	if (wasDirectory(false, f) || wasStylesheetOfModule(f)) {
    	writeToStylesheet();
    }
  })
  monitor.on("removed", function (f, stat) {
		if (wasDirectory(true, f) || wasJavascriptOfModule(f) || wasDataOfModule(f)) {
			writeToJavascript();
		}
		if (wasDirectory(true, f) || wasStylesheetOfModule(f)) {
			writeToStylesheet();
		}
  })
})

exec('cd ' + basePath + '&& harp server', puts);
exec('echo "Starting Server.." && echo "PROGRESS:94"', puts);
exec('sleep 6 "Almost there!" && "PROGRESS:98"', puts);
exec('sleep 10 && echo "Done! Enjoy!" && echo "PROGRESS:100" && open "http://localhost:9000"', puts)