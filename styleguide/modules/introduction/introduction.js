HSG.Modules = HSG.Modules || {};

HSG.Modules.introduction = {
  init: function() {
    console.log('Hello introduction module.');
  }
};

$(function() {
  HSG.Modules.introduction.init();
});
