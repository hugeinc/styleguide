INTEGRATION_TEST = {};

var test = require('../_node-files/node_modules/tape'),
    http = require('http'),
    fs = require('fs'),
    exec = require('child_process').exec,
    request = require('../_node-files/node_modules/request'),
    watch = require('../_node-files/watch'),
    basePath = require('../_node-files/modules/utils').basePath;


function createTestModule() {
    exec('cp -R ' + basePath + '/styleguide/structure/_tests/mocks/00_testmodule ' + basePath + '/styleguide/modules/00_testmodule');
}

function removeTestModule() {
    exec('rm -rf ' + basePath + '/styleguide/modules/00_testmodule');
}

function globalAssetFileCheckModifiedTime(filePath, command, assertion) {
    var originalFileStats = fs.statSync(basePath + filePath),
        originalFileLastModifiedDate = originalFileStats.mtime.getTime(),
        newFileStats,
        newFileLastModifiedDate;

    createTestModule();

    setTimeout(function() {
        command();

        setTimeout(function() {
            newFileStats = fs.statSync(basePath + filePath);
            newFileLastModifiedDate = newFileStats.mtime;

            setTimeout(function() {
                assertion(newFileLastModifiedDate.getTime() > originalFileLastModifiedDate);
                removeTestModule();
            }, 500);
        }, 10000);
    }, 200);
}

INTEGRATION_TEST.run = function(PORT) {

    // Mock a fake data into main _data.json file in order to test update later
    var data = JSON.parse(fs.readFileSync(basePath + '/styleguide/_data.json'));

    if (data && typeof data.clientName !== 'undefined') {
        data.date = '00/00/0000';
        fs.writeFileSync(basePath + '/styleguide/_data.json', JSON.stringify(data, null, 2));
    }

    // watch.js
    test('The server should be running on port ' + PORT, function (t) {
        var result = false;

        http.get({
            host: '127.0.0.1',
            port: PORT,
            path: '/'
        }, function (res) {
            if (res.statusCode == 200) {
                result = res.statusCode;
                t.equal(result, 200);
                t.end();
            }
            res.emit('end');
        }).on('error', function (e) {
            result = false;
            t.equal(result, 200);
            t.end();
        });

    });

    // write-date.js
    test('When the server starts, the "last updated date" must be updated', function (t) {
        t.plan(1);

        setTimeout(function () {
            var data = JSON.parse(fs.readFileSync(basePath + '/styleguide/_data.json'));
            t.notEqual(data.date, '00/00/0000');
        }, 2000);
    });

    // watcher.js
    test('When a module directory is created, the javascript file should be updated', function (t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/scripts/styleguide.js',
           function () {
            // Module folder created in the globalAssetFileCheckModifiedTime function
        }, function(fileWasUpdated) {
            t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
        });

        t.plan(1);
    });

    test('When a javascript of module is created, the global javascript should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/scripts/styleguide.js',
           function () {
            exec('rm ' + basePath + '/styleguide/modules/00_testmodule/testmodule.js && cp ' + basePath + '/styleguide/structure/_tests/mocks/00_testmodule/testmodule.js ' + basePath + '/styleguide/modules/00_testmodule/');
        }, function(fileWasUpdated) {
            t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
        });

        t.plan(1);
    });

    test('When a _data.json of module is created, the global javascript should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/scripts/styleguide.js',
           function () {
            exec('rm ' + basePath + '/styleguide/modules/00_testmodule/_data.json && cp ' + basePath + '/styleguide/structure/_tests/mocks/00_testmodule/_data.json ' + basePath + '/styleguide/modules/00_testmodule/');
        }, function(fileWasUpdated) {
            t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
        });

        t.plan(1);
    });

    test('When a module directory is created the stylesheet file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/styles/styleguide.scss',
            function () {
                removeTestModule();
                createTestModule();
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
            });

        t.plan(1);
    });

    test('When a module CSS is created the global stylesheet file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/styles/styleguide.scss',
            function () {
                exec('rm ' + basePath + '/styleguide/modules/00_testmodule/testmodule.scss && cp ' + basePath + '/styleguide/structure/_tests/mocks/00_testmodule/testmodule.scss ' + basePath + '/styleguide/modules/00_testmodule/');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
            });

        t.plan(1);
    });

    test('When a module directory is changed, the javascript file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/scripts/styleguide.js',
            function () {
                exec('mv ' + basePath + '/styleguide/modules/00_testmodule ' + basePath + '/styleguide/modules/000_testmodule');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
                exec('mv ' + basePath + '/styleguide/modules/000_testmodule ' + basePath + '/styleguide/modules/00_testmodule');
            });

        t.plan(1);
    });

    test('When a javascript of module is changed, the javascript file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/scripts/styleguide.js',
            function () {
                exec('echo "console.log(1);" >> ' + basePath + '/styleguide/modules/00_testmodule/testmodule.js');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
            });

        t.plan(1);
    });

    test('When a _data.json of module is changed, the javascript file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/scripts/styleguide.js',
            function () {
                exec('mv ' + basePath + '/styleguide/modules/00_testmodule/_data.json ' + basePath + '/styleguide/modules/00_testmodule/_dataa.json');
                exec('mv ' + basePath + '/styleguide/modules/00_testmodule/_dataa.json ' + basePath + '/styleguide/modules/00_testmodule/_data.json');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
            });

        t.plan(1);
    });

    test('When a module directory is changed, the stylesheet file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/styles/styleguide.scss',
            function () {
                exec('mv ' + basePath + '/styleguide/modules/00_testmodule ' + basePath + '/styleguide/modules/000_testmodule');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
                exec('mv ' + basePath + '/styleguide/modules/000_testmodule ' + basePath + '/styleguide/modules/00_testmodule');
            });

        t.plan(1);
    });

    test('When a stylesheet of a module is changed, the stylesheet file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/styles/styleguide.scss',
            function () {
                exec('echo "body { background: red; }" >> ' + basePath + '/styleguide/modules/00_testmodule/testmodule.scss');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
            });

        t.plan(1);
    });

    test('When a module directory of module is removed, the javascript file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/scripts/styleguide.js',
            function () {
                removeTestModule();
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
                createTestModule();
            });

        t.plan(1);
    });

    test('When a javascript of module is removed, the javascript file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/scripts/styleguide.js',
            function () {
                exec('rm ' + basePath + '/styleguide/modules/00_testmodule/testmodule.js');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
            });

        t.plan(1);
    });

    test('When a _data.json of module is removed, the javascript file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/scripts/styleguide.js',
            function () {
                exec('rm ' + basePath + '/styleguide/modules/00_testmodule/_data.json');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
            });

        t.plan(1);
    });

    test('When a module directory is removed, the stylesheet file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/styles/styleguide.scss',
            function () {
                removeTestModule();
                createTestModule();
                removeTestModule();
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
                createTestModule();
            });

        t.plan(1);
    });

    test('When a javascript of module is removed, the stylesheet file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/styles/styleguide.scss',
            function () {
                exec('rm ' + basePath + '/styleguide/modules/00_testmodule/testmodule.js');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
            });

        t.plan(1);
    });

    test('When a _data.json of module is removed, the stylesheet file should be updated', function(t) {
        globalAssetFileCheckModifiedTime('/styleguide/assets/styles/styleguide.scss',
            function () {
                exec('rm ' + basePath + '/styleguide/modules/00_testmodule/_data.json');
            }, function(fileWasUpdated) {
                t.equal(fileWasUpdated, true, 'Actual modified time is bigger than the original modified time.');
            });

        t.plan(1);
    });

    // livereloader.js
    test('When a file change the browser should update and contain that change', function(t) {
        var data;

        t.plan(1);

        function assertContains(error, response, body) {
            if (!error && response.statusCode == 200) {
                t.equal(body.indexOf('Testing changing the file.') !== -1, true);
                removeTestModule();
            }
            t.end();
            process.exit();
        }

        createTestModule();

        setTimeout(function() {
            data = JSON.parse(fs.readFileSync(basePath + '/styleguide/modules/00_testmodule/_data.json'));
            data.name = "Testing changing the file.";
            fs.writeFileSync(basePath + '/styleguide/modules/00_testmodule/_data.json', JSON.stringify(data, null, 2));

            setTimeout(function() {
                request('http://localhost:' + PORT, function (error, response, body) {
                    assertContains(error, response, body);
                });
            }, 6000);
        }, 1000);
    });

};
