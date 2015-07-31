var test = require('../_node-files/node_modules/tape');

FRONT_END_TEST = {};

$ = function() {
 this.contents = function() {
  return [];
 };
 return this;
};

require('../scripts/iframe.js');
require('../scripts/styleguide.js');

var StyleguideIframe = FRONT_END_TEST.StyleguideIframe;

StyleguideIframe.init();

test('[StyleguideIframe] should be an object', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIframe, 'object');
});

test('[StyleguideIframe] all $ properties exist', function(t) {
 t.plan(1);
 t.notEqual(typeof StyleguideIframe.$sectionAnchors, 'undefined');
});

test('[StyleguideIframe] all css class properties should be strings', function(t) {
 t.plan(5);
 t.equal(typeof StyleguideIframe.codeToCreateSnippetClass, 'string');
 t.equal(typeof StyleguideIframe.sidebarMenuLinkClass, 'string');
 t.equal(typeof StyleguideIframe.sidebarActiveLinkClass, 'string');
 t.equal(typeof StyleguideIframe.codeSnippetsClass, 'string');
 t.equal(typeof StyleguideIframe.sidebarLinkWasClickedClass, 'string');
});

test('[StyleguideIframe] property modulesOffsetTop should be an array', function(t) {
 t.plan(1);
 t.equal(StyleguideIframe.modulesOffsetTop instanceof Array, true);
});

test('[StyleguideIframe] property activeModule should be null', function(t) {
 t.plan(1);
 t.equal(StyleguideIframe.activeModule, null);
});

test('[StyleguideIframe] method events should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIframe.events, 'function');
});

test('[StyleguideIframe] method codeSnippetsSetup should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIframe.codeSnippetsSetup, 'function');
});

test('[StyleguideIframe] method codeSnippetsToggle should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIframe.codeSnippetsToggle, 'function');
});

test('[StyleguideIframe] method sidebarLinksHighlightSetup should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIframe.sidebarLinksHighlightSetup, 'function');
});

test('[StyleguideIframe] method sidebarLinksHighlight should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIframe.sidebarLinksHighlight, 'function');
});


var StyleguideIndex = FRONT_END_TEST.StyleguideIndex;
StyleguideIndex.init();

test('[StyleguideIndex] should be an object', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex, 'object');
});

test('[StyleguideIndex] all $ properties exist', function(t) {
 t.plan(7);
 t.notEqual(typeof StyleguideIndex.$body, 'undefined');
 t.notEqual(typeof StyleguideIndex.$breakpointsLinks, 'undefined');
 t.notEqual(typeof StyleguideIndex.$sidebarContent, 'undefined');
 t.notEqual(typeof StyleguideIndex.$sidebarLinks, 'undefined');
 t.notEqual(typeof StyleguideIndex.$sidebarToggle, 'undefined');
 t.notEqual(typeof StyleguideIndex.$iframe, 'undefined');
 t.notEqual(typeof StyleguideIndex.$iframeContent, 'undefined');
});

test('[StyleguideIndex] all css class properties should be strings', function(t) {
 t.plan(3);
 t.equal(typeof StyleguideIndex.sidebarOpenedClass, 'string');
 t.equal(typeof StyleguideIndex.sidebarActiveLinkClass, 'string');
 t.equal(typeof StyleguideIndex.sidebarLinkWasClickedClass, 'string');
});

test('[StyleguideIndex] method events should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex.events, 'function');
});

test('[StyleguideIndex] method resizeContent should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex.resizeContent, 'function');
});

test('[StyleguideIndex] method checkHashOnLoad should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex.checkHashOnLoad, 'function');
});

test('[StyleguideIndex] method navigateToAnchor should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex.navigateToAnchor, 'function');
});

test('[StyleguideIndex] method sidebarOpen should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex.sidebarOpen, 'function');
});

test('[StyleguideIndex] method sidebarClose should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex.sidebarClose, 'function');
});

test('[StyleguideIndex] method sidebarResizeHandler should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex.sidebarResizeHandler, 'function');
});

test('[StyleguideIndex] method sidebarSetup should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex.sidebarSetup, 'function');
});

test('[StyleguideIndex] method setActiveSidebarLinkOnClick should be a function', function(t) {
 t.plan(1);
 t.equal(typeof StyleguideIndex.setActiveSidebarLinkOnClick, 'function');
});