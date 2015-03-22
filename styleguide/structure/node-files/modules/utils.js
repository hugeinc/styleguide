var fs = require('fs'),
	pathUtil = require('path'),
	sys = require('sys');

module.exports = {
	basePath: __dirname + '/../../../..',
	getFilename: function(f) {
		var filenameArray = f.split('/'),
			filename = filenameArray[filenameArray.length - 1];

		return filename;
	},
	wasDataOfModule: function(f) {
		return f.indexOf('modules') !== -1 && f.indexOf('_data.json') !== -1
	},
	wasJavascriptOfModule: function(f) {
		return f.indexOf('modules') !== -1 && pathUtil.extname(f) === '.js'
	},
	wasStylesheetOfModule: function(f) {
		var ext = pathUtil.extname(f)
		return f.indexOf('modules') !== -1 && (ext === '.scss' || ext === '.sass' || ext === '.less' || ext === '.styl')
	},
	wasDirectory: function(removed, f) {
		var filename = this.getFilename(f);
		if (!removed) {
			return fs.lstatSync(f).isDirectory()
		} else {
			return filename.indexOf('_') == 1 && filename.indexOf('.') == -1
		}
	},
	wasBaseDataFile: function(f) {
		var filenameArray = f.split('/'),
			folder = filenameArray[filenameArray.length - 2],
			filename = this.getFilename(f);

		return folder === 'styleguide' && filename === '_data.json'
	},
	puts: function(error, stdout, stderr) {
		sys.puts(stdout);
	}
}