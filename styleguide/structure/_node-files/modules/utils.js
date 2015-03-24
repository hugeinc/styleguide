var fs = require('fs'),
	pathUtil = require('path'),
	sys = require('sys');

module.exports = {
	basePath: __dirname + '/../../../..',
	wasDataOfModule: function(f) {
		// console.log('data of module: ', f, f.indexOf('modules') !== -1 && f.indexOf('_data.json') !== -1)
		return f.indexOf('modules') !== -1 && f.indexOf('_data.json') !== -1
	},
	wasJavascriptOfModule: function(f) {
		// console.log('javascript of module: ', f, pathUtil.extname(f), f.indexOf('modules') !== -1 && pathUtil.extname(f) === '.js')
		return f.indexOf('modules') !== -1 && pathUtil.extname(f) === '.js'
	},
	wasStylesheetOfModule: function(f) {
		var ext = pathUtil.extname(f)
		// console.log('stylehseet of module: ', f, pathUtil.extname(f), f.indexOf('modules') !== -1 && (ext === '.scss' || ext === '.sass' || ext === '.less' || ext === '.styl'))
		return f.indexOf('modules') !== -1 && (ext === '.scss' || ext === '.sass' || ext === '.less' || ext === '.styl')
	},
	wasDirectory: function(removed, f) {
		var filenameArray, filename;
		if (!removed) {
			return fs.lstatSync(f).isDirectory()
		} else {
			filenameArray = f.split('/')
			filename = filenameArray[filenameArray.length - 1]
			return filename.indexOf('_') == 1 && filename.indexOf('.') == -1
		}
	},
	puts: function(error, stdout, stderr) {
		sys.puts(stdout);
	}
}