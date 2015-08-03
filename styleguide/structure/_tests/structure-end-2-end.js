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
            .pause(4000);
    },
    "BreakpointsControlsWorking": function (browser) {
        browser
            .click('#small')
            .pause(3000)
            .getAttribute('#small', 'data-size', function(result) {
                browser.assert.attributeEquals('.huge-iframe-wrapper iframe', 'style', 'width: ' + result.value + ';')
            })
            .click('#medium')
            .pause(3000)
            .getAttribute('#medium', 'data-size', function(result) {
                browser.assert.attributeEquals('.huge-iframe-wrapper iframe', 'style', 'width: ' + result.value + ';')
            })
            .click('#large')
            .pause(3000)
            .getAttribute('#large', 'data-size', function(result) {
                browser.assert.attributeEquals('.huge-iframe-wrapper iframe', 'style', 'width: ' + result.value + ';')
            })
            .click('#full')
            .pause(3000)
            .getAttribute('#full', 'data-size', function(result) {
                browser.assert.attributeEquals('.huge-iframe-wrapper iframe', 'style', 'width: ' + result.value + ';')
            });
    },
    "SidebarActiveLinksWorking": function (browser) {
        browser
            .click('a[href="#colors"]')
            .pause(3000)
            .assert.cssClassPresent('a[href="#colors"]', 'active')
            .click('a[href="#buttons"]')
            .pause(3000)
            .assert.cssClassPresent('a[href="#buttons"]', 'active');
    },
    "SidebarLinksTriggerHashChange": function (browser) {
        browser
            .click('a[href="#colors"]')
            .pause(2000)
            .assert.urlContains('#!colors')
            .click('a[href="#buttons"]')
            .pause(2000)
            .assert.urlContains('#!buttons')
    },
    "SidebarToggleIsWorking": function (browser) {
        browser
            .click('.huge-sidebar__toggle--in')
            .pause(3000)
            .assert.cssClassNotPresent('body', 'opened')
            .click('.huge-sidebar__toggle--out')
            .pause(3000)
            .assert.cssClassPresent('body', 'opened')
    },
    "SidebarGetsHiddenOnSmallerViewport": function (browser) {
        browser
            .resizeWindow(1200, 1000)
            .pause(1000)
            .assert.cssClassNotPresent('body', 'opened')
    }
};