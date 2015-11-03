/**
 * Script used for the Iframe only
 */

if (typeof window !== 'undefined') global = window;

var FRONT_END_TEST = global.FRONT_END_TEST || false;

var StyleguideIframe = {
  init: function() {
    if (!$('.huge-iframe-content').length && !FRONT_END_TEST) return false;

    this.$sectionAnchors = $('.anchor');

    this.codeToCreateSnippetClass = '.snippet';
    this.sidebarMenuLinkClass = '.huge-sidebar__nav__item__link';
    this.codeSnippetsClass = '.huge-module__toggle-code';
    this.sidebarLinkWasClickedClass = 'side-menu-clicked';
    this.sidebarActiveLinkClass = 'active';
    this.modulesOffsetTop = [];
    this.activeModule = null;

    if (FRONT_END_TEST) return false;

    this.sidebarLinksHighlightSetup();
    this.codeSnippetsSetup();
    this.events();
  },

  /**
   * All events of the iframe
   * should be registered here
   */
  events: function() {
    var _this = this;

    $(window).scroll(function() {
      _this.sidebarLinksHighlight();
    });

    $(this.codeSnippetsClass).click(function(e) {
      e.preventDefault();
      _this.codeSnippetsToggle($(this));
      _this.sidebarLinksHighlightSetup();
    });
  },

  /**
   * Setup markup code snippet.
   * It gets the HTML of the element and creates the code area
   */
  codeSnippetsSetup: function() {
    var _this = this,
      options = {
        "indent":"auto",
        "indent-spaces":2,
        "wrap":80,
        "markup":true,
        "output-xml":false,
        "numeric-entities":true,
        "quote-marks":true,
        "quote-nbsp":false,
        "show-body-only":true,
        "quote-ampersand":false,
        "break-before-br":true,
        "uppercase-tags":false,
        "uppercase-attributes":false,
        "drop-font-tags":true,
        "tidy-mark":false,
        "quiet":"yes",
        "show-warnings":"no"
      };

    $(this.codeToCreateSnippetClass).each(function(i, obj) {
      var snippetClassName = _this.codeToCreateSnippetClass.replace(/\./g, '');
      var snippet = tidy_html5($(obj).get(0).outerHTML.replace(' ' + snippetClassName, '').replace(snippetClassName, ''), options);

      $(obj).before('<a href="#" class="' + _this.codeSnippetsClass.replace('.', '') + '"></a>');
      $(obj).after('<pre class="language-markup"><code>' + $('<p/>').text(snippet).html() + '</code></pre>').next().hide();
    });

    Prism.highlightAll();
  },

  /**
   * Function that shows or hide the code snippet area
   */
  codeSnippetsToggle: function($elem) {
    var $code = $elem.next().next();

    $code.toggle();
  },

  /**
   * Records all module's offset top value for reference.
   * Such values will be used later when trying to discover where the user is
   * when scrolling the iframe.
   */
  sidebarLinksHighlightSetup: function() {
    var _this = this;

    this.$sectionAnchors.each(function(i, obj) {
      if (typeof $(obj) === 'undefined') return false;
      var top = $(obj).attr('id') === _this.$sectionAnchors.first().attr('id') ? 0 : $(obj).offset().top + 100;

      _this.modulesOffsetTop.push({
        module: $(obj).attr('id'),
        offset: top
      });
    });
  },

  /**
   * Highlight the current module's sidebar link
   * based on scroll position
   */
  sidebarLinksHighlight: function() {
    var _this = this,
      scrollTop = $(window).scrollTop(),
      actualActiveSectionId,
      top = null,
      i = 0;

    // Shutdown this feature in Chrome.
    // Chrome have a know issue with file protocol and iframe comunication.
    // It is not supported so we should not raise errors.
    if (window.location.protocol === 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) return false;

    for (i; i <= this.modulesOffsetTop.length - 1; i++) {
      top = _this.modulesOffsetTop[i].offset;

      if (top < scrollTop + 100) {
        actualActiveSectionId = _this.modulesOffsetTop[i].module;
      }
      if (scrollTop + $(window).height() === $(document).height()) {
        actualActiveSectionId = $(_this.sidebarMenuLinkClass, window.parent.document).last().attr('href').replace('#', '');
      }
    }

    if (_this.activeModule !== actualActiveSectionId && typeof actualActiveSectionId !== 'undefined') {
      if (!$('body', window.parent.document).hasClass(this.sidebarLinkWasClickedClass)) {
        $(this.sidebarMenuLinkClass, window.parent.document).removeClass(this.sidebarActiveLinkClass);
        $(this.sidebarMenuLinkClass + '[href="#' + actualActiveSectionId + '"]', window.parent.document).addClass(this.sidebarActiveLinkClass);

        // Why changing the hash is so slow and produces a lag?
        // Use ! to prevent de default browser behavior of anchor navigation
        window.parent.location.hash = '!' + actualActiveSectionId;
      }
      $('body', window.parent.document).removeClass(this.sidebarLinkWasClickedClass);
      _this.activeModule = actualActiveSectionId;
    }
  }
};

if(!FRONT_END_TEST) {
  $(window).load(function() {
    StyleguideIframe.init();
  });
} else {
  FRONT_END_TEST.StyleguideIframe = StyleguideIframe;
}
