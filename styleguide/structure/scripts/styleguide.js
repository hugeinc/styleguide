var StyleguideIndex = {
	init: function() {
	  if($('.huge-iframe-content').length) return false;

	  this.$body = $('body');
	  this.$breakpointsLinks = $('.huge-header__breakpoints__item__link');
	  this.$sidebarContent = $('.huge-sidebar__content');
	  this.$sidebarLinks = $('.huge-sidebar__nav__item__link');
	  this.$sidebarToggle = $('[class*="huge-sidebar__toggle"]');
	  this.$iframe = $('.huge-iframe-wrapper iframe');
	  this.$iframeContent = $('.huge-iframe-wrapper iframe').contents();

	  this.sidebarOpenedClass = 'opened';
	  this.sidebarActiveLinkClass = 'active';
	  this.sidebarLinkWasClickedClass = 'side-menu-clicked';

	  this.sidebarSetup();
	  this.checkHashOnLoad();
	  this.events();
	},
	events: function() {
	  var _this = this

	  this.$breakpointsLinks.click(function() {
	    _this.resizeContent($(this));
	  });

	  this.$sidebarLinks.click(function() {
	    _this.setActiveSidebarLinkOnClick($(this));
	    _this.navigateToAnchor($(this));
	  });

	  this.$sidebarToggle.click(function(e) {
	    e.preventDefault();
	    _this.$body.toggleClass(_this.sidebarOpenedClass);
	  });

	  $(window).resize(function() {
	  	_this.sidebarResizeHandler();
	  });
	},
	resizeContent: function($elem) {
	  var sizeLabel = $elem.data('size-label'),
	    size = sizeLabel === 'full' ? $elem.data('size') : parseInt($elem.data('size').replace('px', ''), 10);

	  this.$iframe.width(size);
	},
	checkHashOnLoad: function() {
	  // Shutdown this feature in Chrome.
	  // Chrome have a know issue with file protocol and iframe comunication.
	  // It is not supported so we should not raise errors.
	  if(window.location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) return false;
	  if(window.location.hash == '#' || window.location.hash == '') return false;

	  var _this = this,
	  	top = this.$iframeContent.find('section' + window.location.hash.replace('!', '')).offset().top,
	  	$iframeHtmlBody = this.$iframeContent.find('html, body');

	  if(this.$iframeContent.find('section' + window.location.hash.replace('!', '')).index() == 0) {
	    $(window).load(function() {
	      $iframeHtmlBody.animate({scrollTop: 0}, 500);
	    });
	  } else {
	    $iframeHtmlBody.animate({scrollTop: top}, 0);
	  }
	},
	navigateToAnchor: function($elem) {
	  // Shutdown this feature in Chrome.
	  // Chrome have a know issue with file protocol and iframe comunication.
	  // It is not supported so we should not raise errors.
	  if(window.location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) return false;

	  var top = this.$iframeContent.find('html, body').scrollTop() + this.$iframeContent.find('section' + $elem.attr('href')).offset().top;

	  window.location.hash = '!' + $elem.attr('href').replace('#', '');

	  this.$iframeContent.find('html, body').animate({scrollTop: top}, 800);
	},
	sidebarOpen: function() {
		this.$body.addClass('opened');
	},
	sidebarClose: function() {
		this.$body.removeClass('opened');
	},
	sidebarResizeHandler: function() {
		if ($(window).width() <= 1220) {
		  this.sidebarClose();
		} else {
		  this.sidebarOpen();
		}
	},
	sidebarSetup: function() {
	  // Shutdown this feature in Chrome.
	  // Chrome have a know issue with file protocol and iframe comunication.
	  // It is not supported so we should not raise errors.
	  if(window.location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
	    this.$sidebarContent.remove();
	    this.$sidebarToggle.remove();
	    return false;
	  }

	  if ($(window).width() >= 1220) {
	    this.sidebarOpen();
	  }
	},
	setActiveSidebarLinkOnClick: function($elem) {
	  this.$body.addClass(this.sidebarLinkWasClickedClass);
	  this.$sidebarLinks.removeClass(this.sidebarActiveLinkClass);
	  $elem.addClass(this.sidebarActiveLinkClass);
	}
};

$(window).load(function() {
	StyleguideIndex.init();
});