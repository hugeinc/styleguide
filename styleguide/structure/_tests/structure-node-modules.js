var test = require('../_node-files/node_modules/tape'),
    livereloader = require('../_node-files/modules/livereloader'),
    utils = require('../_node-files/modules/utils'),
    watcher = require('../_node-files/modules/watcher'),
    writeDate = require('../_node-files/modules/write-date'),
    writeToJavascript = require('../_node-files/modules/write-to-javascript'),
    writeToStylesheet = require('../_node-files/modules/write-to-stylesheet');

test('[Structure Modules] Livereloader should be an object', function(t) {
    t.plan(1);
    t.equal(typeof livereloader, 'object');
});

test('[Structure Modules] Livereloader should have an start function', function(t) {
    // Livereloader behavior should be tested in an integration test
    t.plan(1);
    t.equal(typeof livereloader.start, 'function');
});

test('[Structure Modules] Utils should be an object', function(t) {
    t.plan(1);
    t.equal(typeof utils, 'object');
});

test('[Structure Modules] Utils basePath should be a string', function(t) {
    t.plan(1);
    t.equal(typeof utils.basePath, 'string');
});

test('[Structure Modules] Utils getFilename should be a function', function(t) {
    t.plan(1);
    t.equal(typeof utils.getFilename, 'function');
});

test('[Structure Modules] Utils getFilename should be a function', function(t) {
    t.plan(1);
    t.equal(typeof utils.getFilename, 'function');
});

test('[Structure Modules] Utils getFilename should return false if no parameter is given', function(t) {
    var result = utils.getFilename();

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils getFilename should return the file name when path is given', function(t) {
    var result = utils.getFilename('a/simple/test-like/path/to/a/file.txt');

    t.plan(1);
    t.equal(result, 'file.txt');
});

test('[Structure Modules] Utils wasDataOfModule should be a function', function(t) {
    t.plan(1);
    t.equal(typeof utils.wasDataOfModule, 'function');
});

test('[Structure Modules] Utils wasDataOfModule should return false if no parameter is given', function(t) {
    var result = utils.wasDataOfModule();

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasDataOfModule should return false if a file other than _data.json is given', function(t) {
    var result = utils.wasDataOfModule('a/simple/test-like/path/to/a/file.txt');

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasDataOfModule should return false if a _data.json file not in a module folder is given', function(t) {
    var result = utils.wasDataOfModule('a/simple/test-like/path/to/a/_data.json');

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasDataOfModule should return true if a _data.json file within a module folder is given', function(t) {
    var result = utils.wasDataOfModule('a/simple/test-like/path/to/a/modules/_data.json');

    t.plan(1);
    t.equal(result, true);
});

test('[Structure Modules] Utils wasJavascriptOfModule should be a function', function(t) {
    t.plan(1);
    t.equal(typeof utils.wasJavascriptOfModule, 'function');
});

test('[Structure Modules] Utils wasJavascriptOfModule should return false if no parameter is given', function(t) {
    var result = utils.wasJavascriptOfModule();

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasJavascriptOfModule should return false if a file other than *.js is given', function(t) {
    var result = utils.wasJavascriptOfModule('a/simple/test-like/path/to/a/file.txt');

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasJavascriptOfModule should return false if a *.js file not in a module folder is given', function(t) {
    var result = utils.wasJavascriptOfModule('a/simple/test-like/path/to/a/test.js');

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasJavascriptOfModule should return true if a *.js file within a module folder is given', function(t) {
    var result = utils.wasJavascriptOfModule('a/simple/test-like/path/to/a/modules/test.js');

    t.plan(1);
    t.equal(result, true);
});

test('[Structure Modules] Utils wasDirectory should be a function', function(t) {
    t.plan(1);
    t.equal(typeof utils.wasDirectory, 'function');
});

test('[Structure Modules] Utils wasDirectory should return false if no parameter is given', function(t) {
    var result = utils.wasDirectory();

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasDirectory should return false if not all parameters are given (first)', function(t) {
    var result = utils.wasDirectory(1);

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasDirectory should return false if not all parameters are given (second and last)', function(t) {
    var result = utils.wasDirectory(undefined, 1);

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasDirectory should return false if the parameter "removed" is true and path does not follows the module folder pattern (N_name)', function(t) {
    var result = utils.wasDirectory(true, 'a/simple/test-like/path/to/a/regular/folder');

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasDirectory should return true if the parameter "removed" is true and path follows the module folder pattern (N_name)', function(t) {
    var result = utils.wasDirectory(true, 'a/simple/test-like/path/to/a/regular/1_module');

    t.plan(1);
    t.equal(result, true);
});

test('[Structure Modules] Utils wasDirectory should return false if the parameter "removed" is true and path is not a real folder', function(t) {
    var result = utils.wasDirectory(true, '../test/folder');

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasDirectory should return true if the parameter "removed" is false and path is of a real folder', function(t) {
    var result = utils.wasDirectory(false, __dirname + '/../images');

    t.plan(1);
    t.equal(result, true);
});

test('[Structure Modules] Utils wasDirectory should return true if the parameter "removed" is true and path is of a file', function(t) {
    var result = utils.wasDirectory(true, '../images/image.png');

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasBaseDataFile should be a function', function(t) {
    t.plan(1);
    t.equal(typeof utils.wasBaseDataFile, 'function');
});

test('[Structure Modules] Utils wasBaseDataFile should return false if no parameter is given', function(t) {
    var result = utils.wasBaseDataFile();

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasBaseDataFile should return false if path does not contain a styleguide folder', function(t) {
    var result = utils.wasBaseDataFile('a/folder/_data.json');

    t.plan(1);
    t.equal(result, false);
});

test('[Structure Modules] Utils wasBaseDataFile should return true if path contain a styleguide folder and _data.json file', function(t) {
    var result = utils.wasBaseDataFile('a/styleguide/_data.json');

    t.plan(1);
    t.equal(result, true);
});

test('[Structure Modules] WriteDate should be a function', function(t) {
    // WriteDate behavior should be tested in an integration test
    t.plan(1);
    t.equal(typeof writeDate, 'function');
});

test('[Structure Modules] WriteToJavascript should be a function', function(t) {
    // WriteToJavascript behavior should be tested in an integration test
    t.plan(1);
    t.equal(typeof writeToJavascript, 'function');
});

test('[Structure Modules] WriteToStylesheet should be a function', function(t) {
    // WriteToStylesheet behavior should be tested in an integration test
    t.plan(1);
    t.equal(typeof writeToStylesheet, 'function');
});
