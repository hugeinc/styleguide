// TODO: E2E Tests
INTEGRATION_TEST = {};

var watch = require('../_node-files/watch'),
    that = this,
    TEST_PORT;
/*
 StyleguideIframe

 init:
 - Check if all needed DOM elements are present
 - Check if breakpoints controls are working
 - Check if active sidebar links are working
 - Check if sidebar navigation is working
 - Check if sidebar toggle is working
 - Check if sidebar is hidden at proper window resize
 - Check if hash is changing upon module navigation
 */

module.exports = {
 before: function(browser, done) {
     INTEGRATION_TEST.run = function(PORT) {
         console.log('Styleguide started. Ready to run Nightwatch tests.');
         TEST_PORT = PORT;
         done();
     };
 },
 "demoTest": function (browser) {
   browser
    .url('http://localhost:' + TEST_PORT)
    .waitForElementVisible('body', 1000)
    .pause(1000)
    .end();
 }
};

/*
 StyleguideIndex

 init:
 - Check if all needed DOM elements are present
 - Check if code snippets are present
 - Check if code snippets are working
 */