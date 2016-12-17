#!/bin/bash

npm i
cd static
npm install && $(npm bin)/jspm install
cd ..
