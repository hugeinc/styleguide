var HSG = HSG || {};

HSG.Build = {
  init: function() {
    this.filenameRegex = /[^\/]*$/;
    this.basePath = window.location.pathname.replace(this.filenameRegex, '').replace('/styleguide', '') + 'styleguide/';
    this.filesIframe = ['config'];
    this.filesStyleguide = ['config', 'lang'];
    this.ajaxPromises = [];
    this.modulesData = [];
    this.setup = null;
  },
  getJsons: function(file, index) {
    if (typeof file === 'undefined') throw new Error('File must be defined');

    var _this = this;

    return $.ajax({
      url: this.basePath + file,
      type: 'GET',
      dataType: 'json'
    })
    .done(function(data) {
      if (typeof data === 'object' && typeof data.module === 'undefined') {
        _this.setup = $.extend({}, _this.setup, data);
      } else if (typeof data === 'object' && typeof data.module !== 'undefined') {
        _this.modulesData[index] = data.module;
      }
    })
    .fail(function() {
      throw new Error('Could not load the ' + file + ' file.');
    });
  },
  iframe: function(callback) {
    var _this = this,
        length = this.filesIframe.length - 1,
        ajaxPromise = [];

    for (i = length; i >= 0; i--) {
      ajaxPromise.push(_this.getJsons(_this.filesIframe[i] + '.json'));
    }

    $.when.apply(null, ajaxPromise).done(function() {
      var modules = _this.setup.modules,
          modulesLength = modules.length - 1,
          modulesTemplate = Handlebars.getTemplate('modules', 'structure/templates/'),
          ajaxPromise = [],
          modulesHtmls = [];

      for (i = 0; i <= modulesLength; i++) {
        ajaxPromise.push(_this.getJsons('modules/' + modules[i] + '/config.json', i));
      }

      $.when.apply(null, ajaxPromise).done(function() {

        $.each(_this.modulesData, function(i, module) {
          var template = Handlebars.getTemplate(module.id, 'modules/' + module.id + '/');

          if (typeof module.jsDependencies !== 'undefined') {
            $.each(module.jsDependencies, function() {
              $.getScript(HSG.Build.basePath + '/modules/' + module.id + '/' + this);
            });
          }

          if (module.hasScript === 'yes') {
            $.getScript(HSG.Build.basePath + '/modules/' + module.id + '/' + module.id + '.js');
          }

          modulesHtmls.push({id: module.id, html: template(module)});
        });

        $('#modules-wrapper').append(modulesTemplate({modules: modulesHtmls}));

        setTimeout(function() {
          if (typeof callback !== 'undefined' && typeof callback === 'function') callback();
        }, 200);

      });
    });
  },
  styleguide: function(callback) {
    var _this = this,
        length = this.filesStyleguide.length - 1,
        ajaxPromise = [];

    for (i = length; i >= 0; i--) {
      ajaxPromise.push(_this.getJsons(_this.filesStyleguide[i] + '.json'));
    }

    $.when.apply(null, ajaxPromise).done(function() {
      var headerTemplate = Handlebars.getTemplate('header', 'styleguide/structure/templates/'),
          sidebarTemplate = Handlebars.getTemplate('sidebar', 'styleguide/structure/templates/'),
          modules = _this.setup.modules,
          modulesLength = modules.length - 1,
          ajaxPromise = [];

      for (i = 0; i <= modulesLength; i++) {
        ajaxPromise.push(_this.getJsons('modules/' + modules[i] + '/config.json', i));
      }

      $.when.apply(null, ajaxPromise).done(function() {
        var headerHtml = headerTemplate({
          begining: _this.setup.translations[_this.setup.language].begining,
          small: _this.setup.translations[_this.setup.language].small,
          medium: _this.setup.translations[_this.setup.language].medium,
          large: _this.setup.translations[_this.setup.language].large,
          full: _this.setup.translations[_this.setup.language].full,
          size: _this.setup.translations[_this.setup.language].size
        }),
        sidebarHtml = sidebarTemplate({
          logoImage: _this.setup.logoImage,
          modules: _this.modulesData
        });

        $('body').prepend(sidebarHtml);
        $('body').prepend(headerHtml);
        if (typeof callback !== 'undefined' && typeof callback === 'function') callback();
      });
    });
  }
};

HSG.Build.init();
