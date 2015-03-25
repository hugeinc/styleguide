/**
 * Main Node file
 */
var exec = require('child_process').exec,
	watcher = require('./modules/watcher'),
	livereloader = require('./modules/livereloader'),
	utils = require('./modules/utils'),
	PORT = 9000;

// Files watcher
watcher.start();
// Livereload server
livereloader.start();

// Initialize Harp
exec('cd ' + utils.basePath + '&& harp server', utils.puts);
exec('echo "Starting Server.." && echo "PROGRESS:94"', utils.puts);
exec('sleep 6 "Almost there!" && "PROGRESS:98"', utils.puts);
exec('sleep 15 && echo "Done! Enjoy!" && echo "PROGRESS:100" && open "http://localhost:' + PORT + '"', utils.puts);
