Handlebars.getTemplate = function(name, path) {
  if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
    $.ajax({
      url: path + name + '.handlebars',
      success: function(data) {
        if (Handlebars.templates === undefined) {
          Handlebars.templates = {};
        }
        Handlebars.templates[name] = Handlebars.compile(data);
      },
      async: false
    });
  }
  return Handlebars.templates[name];
};
