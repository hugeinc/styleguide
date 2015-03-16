var StyleguideIframe = {
	init: function() {
		if(!$('.huge-iframe-content').length) return false;

		this.$sectionAnchors = $('.anchor');

		this.codeToCreateSnippetClass = '.snippet';
		this.sidebarMenuLinkClass = '.huge-sidebar__nav__item__link';
		this.codeSnippetsClass = '.huge-module__toggle-code';
		this.sidebarLinkWasClickedClass = 'side-menu-clicked';
		this.sidebarActiveLinkClass = 'active';

		this.sidebarLinksHighlight();
		this.codeSnippetsSetup();
		this.events();
	},
	events: function() {
		var _this = this;

		$(window).scroll(function() {
		  _this.sidebarLinksHighlight();
		});

		$(this.codeSnippetsClass).click(function(e) {
			e.preventDefault();
			_this.codeSnippetsToggle($(this));
		});
	},
	codeSnippetsSetup: function() {
		var _this = this;

		$(this.codeToCreateSnippetClass).each(function(i, obj) {
		  var $snippet = $(obj).get(0).outerHTML.replace(' ' + this.codeToCreateSnippetClass, '').replace(this.codeToCreateSnippetClass, '');

		  $(obj).before('<a href="#" class="' + _this.codeSnippetsClass.replace('.', '') + '"></a>');
		  $(obj).after('<pre class="language-markup"><code>' + $('<p/>').text($snippet).html() + '</code></pre>').next().hide();
		})

		Prism.highlightAll();
	},
	codeSnippetsToggle: function($elem) {
		var $code = $elem.next().next();

		$code.toggle();
	},
	sidebarLinksHighlight: function() {
		var _this = this,
			scrollTop = $(window).scrollTop(),
	    actualActiveSectionId;
		
		// Shutdown this feature in Chrome.
		// Chrome have a know issue with file protocol and iframe comunication.
		// It is not supported so we should not raise errors.
		if(window.location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) return false;

		this.$sectionAnchors.each(function(i, obj) {
		  var top = $(obj).offset().top;

		  if (top < scrollTop + 100) {
		    actualActiveSectionId = $(obj).attr('id');
		  }
		  if (scrollTop + $(window).height() === $(document).height()) {
		    actualActiveSectionId = $(_this.sidebarMenuLinkClass, window.parent.document).last().attr('href').replace('#', '');
		  }
		});

		if (!$('body', window.parent.document).hasClass(this.sidebarLinkWasClickedClass)) {
		  $(_this.sidebarMenuLinkClass, window.parent.document).removeClass(this.sidebarActiveLinkClass);
		  $(_this.sidebarMenuLinkClass + ' [href="#' + actualActiveSectionId + '"]', window.parent.document).addClass(this.sidebarActiveLinkClass);
		  window.parent.location.hash = '!' + actualActiveSectionId;
		}
		$('body', window.parent.document).removeClass(this.sidebarLinkWasClickedClass);
	}
};

$(window).load(function() {
	StyleguideIframe.init();
});