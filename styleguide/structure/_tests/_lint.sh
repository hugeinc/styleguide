#!/bin/bash

cd ..
jshint scripts/*.js
jshint _node-files/*.js
jshint _node-files/modules/*.js
jscs scripts/*.js
jscs _node-files/*.js
jscs _node-files/modules/*.js
cd ../..
find . -name \*.json  | xargs -I {} jsonlint -q {}