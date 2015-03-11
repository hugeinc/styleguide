var HSG = HSG || {};

HSG.Iframe = {
  init: function() {
    var _this = this;

    if (!$('body#styleguide').length) return false;

    HSG.Build.iframe(function() {
      $.getScript(HSG.Build.basePath + '/structure/scripts/vendor/prism.js', function() {
        Prism.highlightAll();
      });

      $(document).scroll(function() {
        _this.highlightMenu();
      });
      $(window).load(function() {
        HSG.Styleguide.resizeToCover();
      });
      HSG.Styleguide.checkHash();
      HSG.Styleguide.resizeToCover();

      _this.highlightMenu();
      _this.snippet();
    });
  },
  highlightMenu: function() {
    var $anchors = $('.anchor'),
        scrollTop = $(document).scrollTop(),
        lastId;

    $anchors.each(function(id, obj) {
      var top = $(obj).offset().top;

      if (top < scrollTop + 100) {
        lastId = $(obj).attr('id');
      }

      if (scrollTop + $(window).height() === $(document).height()) {
        lastId = $('aside ul a', window.parent.document).last().attr('id');
      }
    });

    if (!$('body', window.parent.document).hasClass('sideMenuClicked')) {
      $('aside a', window.parent.document).removeClass('active');
      $('aside a#' + lastId, window.parent.document).addClass('active');
      window.parent.location.hash = '#' + lastId;
    }
    $('body', window.parent.document).removeClass('sideMenuClicked');
  },
  snippet: function() {
    var $snips = $('.huge_snippet');

    $snips.each(function(id, obj) {
      var $obj = $(obj),
          $snippet = $obj.get(0).outerHTML.replace(' huge_snippet', '').replace('huge_snippet', '');

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

    if ($('body#styleguide').length) return false;

    HSG.Build.styleguide(function() {
      $.getScript(HSG.Build.basePath + '/structure/scripts/vendor/ish./js/init.js');

      $(window).resize(function() {
        _this.resizeToCover();
      });
      $(window).load(function() {
        _this.resizeToCover();
      });
      _this.resizeToCover();

      _this.menuControl();
      _this.asideToggleClass();
      _this.anchorClick();
    });
  },
  checkHash: function() {
    if (!window.parent.location.hash) return false;
    var top = $('section' + window.parent.location.hash).offset().top;

    $('html, body').animate({scrollTop: top}, 0);
  },
  anchorClick: function() {
    var $aside = $('aside'),
        $nav = $aside.find('nav'),
        $links = $nav.find('a'),
        _this = this;

    $links.click(function(e) {
      e.preventDefault();

      _this.navigateToAnchor(this);
    });
  },
  navigateToAnchor: function(elem) {
    var $areaIFrame = $('#sg-vp-wrap, #sg-gen-container, #sg-viewport'),
      $aside = $('aside'),
      $nav = $aside.find('nav'),
      $links = $nav.find('a'),
      $elem = $(elem),
      top = $areaIFrame.contents().find('section' + $(elem).attr('href')).offset().top;

    window.location.hash = $(elem).attr('href');

    $areaIFrame.contents().find('html, body').animate({scrollTop: top}, 500);
  },
  resizeToCover: function(animate) {
    var $areaIFrame = $('#sg-vp-wrap, #sg-gen-container, #sg-viewport'),
        $header = $('header'),
        $aside = $('aside'),
        headerH = $header.height(),
        asideW = 240,
        windowW = $(window).width(),
        windowH = $(window).height(),
        $nav = $aside.find('nav');

    $header.width(windowW - asideW);
    $areaIFrame.height(windowH - headerH);

    // $nav.height(windowH - $nav.offset().top);

    if ($aside.hasClass('opened') && windowW > 1200) {
      $areaIFrame.width(windowW - asideW);

      if (animate) {
        $areaIFrame.animate({ left: asideW }, 300);
      } else {
        $areaIFrame.css({ left: asideW });
      }
      $header.width(windowW - asideW);
      $header.css({ left: asideW });
    } else {
      $areaIFrame.width(windowW);
      if (animate) {
        $areaIFrame.animate({ left: 0 }, 300);
      } else {
        $areaIFrame.css({ left: 0 });
      }
      $header.width(windowW - 64);
      $header.css({ left: 64 });
    }
  },
  menuControl: function() {
    var _this = this,
        $btToggle = $('.huge_toggle-menu'),
        $aside = $('aside');

    if ($(window).width() >= 1220) {
      $aside.addClass('opened');
      _this.resizeToCover(true);
    }

    $(window).resize(function() {
      if ($(window).width() <= 1220) {
        if ($aside.hasClass('opened')) {
          $aside.removeClass('opened');
          _this.resizeToCover(true);
        }
      } else {
        if (!$aside.hasClass('opened')) {
          $aside.addClass('opened');
          _this.resizeToCover(true);
        }
      }
    });

    $btToggle.click(function(e) {
      e.preventDefault();
      $aside.toggleClass('opened');
      _this.resizeToCover(true);
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

$(document).ready(function() {
  HSG.Styleguide.init();
  HSG.Iframe.init();
});
