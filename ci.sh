#!/bin/sh
npm install
webpack
pm2 restart 0 --watch
