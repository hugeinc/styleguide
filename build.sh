#!/bin/bash
# jspm bundle-sfx HugeStyleguide/main bundle.js
harp compile
cd www/style
postcss --use autoprefixer -o main.css main.css
cd ../..

