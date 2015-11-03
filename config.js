System.config({
  "paths": {
    "*": "*.js",
    "HugeStyleguide/*": "scripts/*.js",
    "github:*": "jspm_packages/github/*.js",
    "HugeStyleguideWebsite/*": "scripts/*.js"
  }
});

System.config({
  "map": {
    "jquery": "github:components/jquery@2.1.4"
  }
});

