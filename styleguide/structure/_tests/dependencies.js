var test = require('../_node-files/node_modules/tape'),
    exec = require('child_process').exec,
    livereload = require('../_node-files/node_modules/livereload'),
    fs = require('fs'),
    path = require('path'),
    watch = require('../_node-files/node_modules/watch');

test('[Dependencies] Child process exec should be a function', function(t) {
    t.plan(1);
    t.equal(typeof exec, 'function');
});

test('[Dependencies] File System module should be an object', function(t) {
    t.plan(1);
    t.equal(typeof fs, 'object');
});

test('[Dependencies] Livereload should be an object', function(t) {
    t.plan(1);
    t.equal(typeof livereload, 'object');
});

test('[Dependencies] Path utility should be an object', function(t) {
    t.plan(1);
    t.equal(typeof path, 'object');
});

test('[Dependencies] Watch utility should be an object', function(t) {
    t.plan(1);
    t.equal(typeof watch, 'object');
});