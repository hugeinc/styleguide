var livereload = require('livereload'),
	basePath = __dirname + '/../../..';

module.exports = {
	start: function() {
		server = livereload.createServer({
			exts: ['js', 'jade', 'json', 'css', 'less', 'sass', 'scss', 'styl', 'svg', 'png', 'jpg', 'gif']
		});
		server.watch(basePath);
	}
}

// exclusions: ['styleguide.scss', 'styleguide.less', 'styleguide.sass', 'styleguide.styl', 'styleguide.js']