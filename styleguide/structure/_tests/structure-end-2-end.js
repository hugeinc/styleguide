INTEGRATION_TEST = {};

var watch = require('../_node-files/watch'),
    that = this,
    TEST_PORT;

module.exports = {
    before: function(browser, done) {
     INTEGRATION_TEST.run = function(PORT) {
         console.log('Styleguide started. Ready to run Nightwatch tests.');
         TEST_PORT = PORT;
         done();
     };
    },
    "DOMelementsPresent": function (browser) {
        browser
            .url('http://127.0.0.1:' + TEST_PORT)
            .waitForElementVisible('body', 2000)
            .pause(2000)
            .maximizeWindow()
            .assert.elementPresent('.huge-header')
            .assert.elementPresent('.huge-sidebar')
            .assert.elementPresent('.huge-header__welcome')
            .assert.elementPresent('.huge-header__breakpoints')
            .assert.elementPresent('.huge-iframe-wrapper')
            .assert.elementPresent('.huge-sidebar__content')
            .assert.elementPresent('.huge-sidebar__nav')
            .pause(4000)
            .perform(function(client, done) {
                setTimeout(function() {
                    client.end();
                    done();
                    process.exit();
                }, 500);
            });
    }
};