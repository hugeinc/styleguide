HSG.Modules = HSG.Modules || {};

HSG.Modules.introduction = {
  init: function() {
    console.log('Hello introduction module. This is an example of how to use Javascript in a module.');
  }
};

$(function() {
  HSG.Modules.introduction.init();
});
