#!/bin/bash

jshint ../scripts/*.js
jscs ../scripts/*.js
cd ../../..
find . -name \*.json  | xargs -I {} jsonlint -q {}