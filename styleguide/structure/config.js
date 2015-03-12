System.config({
  "paths": {
    "*": "*.js",
    "HugeStyleguideStructure/*": "scripts/*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "jquery": "github:components/jquery@2.1.3",
    "prism": "github:PrismJS/prism@gh-pages"
  }
});

