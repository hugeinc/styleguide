var HSG = HSG || {};

HSG.Iframe = {
  init: function() {
    var _this = this;

    if(!$('#iframe-module-content').length) return false;

    Prism.highlightAll();

    $(window).scroll(function() {
      _this.highlightMenu();
    });

    // _this.highlightMenu();
    _this.snippet();
  },
  highlightMenu: function() {
    var $anchors = $('.anchor'),
        scrollTop = $(window).scrollTop(),
        lastId;
    
    if(window.location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) return false;

    $anchors.each(function(id, obj) {
      var top = $(obj).offset().top;

      if (top < scrollTop + 100) {
        lastId = $(obj).attr('id');
      }
      if (scrollTop + $(window).height() === $(document).height()) {
        lastId = $('aside ul a', window.parent.document).last().attr('href').replace('#', '');
      }
    });

    if (!$('body', window.parent.document).hasClass('sideMenuClicked')) {
      $('aside a', window.parent.document).removeClass('active');
      $('aside a[href="#' + lastId + '"]', window.parent.document).addClass('active');
      window.parent.location.hash = '!' + lastId;
    }
    $('body', window.parent.document).removeClass('sideMenuClicked');
  },
  snippet: function() {
    var $snips = $('.snippet');

    $snips.each(function(id, obj) {
      var $obj = $(obj),
          $snippet = $obj.get(0).outerHTML.replace(' snippet', '').replace('snippet', '');

      $obj.before('<a href="#" class="toggle-code">Show code</a>');
      $obj.after('<pre class="language-markup"><code>' + $('<p/>').text($snippet).html() + '</code></pre>').next().hide();
    });

    $('.toggle-code').click(function(e) {
      var $code = $(this).next().next();

      $code.toggle();
      e.preventDefault();
    });
  }
};

HSG.Styleguide = {
  init: function() {
    var _this = this;

    if($('#iframe-module-content').length) return false;

    _this.menuControl();
    _this.asideToggleClass();
    _this.anchorClick();
    _this.checkHash();

    $('nav.sizes a').click(function() {
      _this.resizeContent($(this));
    });
  },
  resizeContent: function($elem) {
    var sizeLabel = $elem.data('size-label'),
      size = sizeLabel === 'full' ? $elem.data('size') : parseInt($elem.data('size').replace('px', ''), 10);

    $('#modules-wrapper iframe').width(size)
  },
  checkHash: function() {
    if(window.location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) return false;
    if(window.location.hash == '#' || window.location.hash == '') return false;
    var top = $('#modules-wrapper iframe').contents().find('section' + window.location.hash.replace('!', '')).offset().top;
    if($('#modules-wrapper iframe').contents().find('section' + window.location.hash.replace('!', '')).index() == 0) {
      $(window).load(function() {
        $('#modules-wrapper iframe').contents().find('html, body').animate({scrollTop: 0}, 500);
      });
    } else {
      $('#modules-wrapper iframe').contents().find('html, body').animate({scrollTop: top}, 0);
    }
  },
  anchorClick: function() {
    var $links = $('aside a'),
        _this = this;

    $links.click(function(e) {
      e.preventDefault();

      _this.navigateToAnchor(this);
    });
  },
  navigateToAnchor: function(elem) {
    if(window.location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) return false;
    var $modules = $('#modules-wrapper iframe').contents(),
      $elem = $(elem),
      top = $modules.find('html, body').scrollTop() + $modules.find('section' + $(elem).attr('href')).offset().top;

    window.location.hash = '!' + $(elem).attr('href').replace('#', '');

    $modules.find('html, body').animate({scrollTop: top}, 800);
  },
  menuControl: function() {
    var _this = this,
        $btToggle = $('.toggle-menu'),
        $aside = $('aside');

    if(window.location.protocol == 'file:' && navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
      $aside.remove();
      $btToggle.remove();
      return false;
    }

    if ($(window).width() >= 1220) {
      $('body').addClass('opened');
    }

    $(window).resize(function() {
      if ($(window).width() <= 1220) {
        if ($('body').hasClass('opened')) {
          $('body').removeClass('opened');
        }
      } else {
        if (!$('body').hasClass('opened')) {
          $('body').addClass('opened');
        }
      }
    });

    $btToggle.click(function(e) {
      e.preventDefault();
      $('body').toggleClass('opened');
    });
  },
  asideToggleClass: function() {
    var $asideNav = $('aside nav ul'),
        $asideLinks = $asideNav.find('a');

    $asideLinks.click(function() {
      $('body').addClass('sideMenuClicked');
      $asideLinks.removeClass('active');
      $(this).addClass('active');
    });
  }
};

$(window).load(function() {
  HSG.Styleguide.init();
  HSG.Iframe.init();
});
