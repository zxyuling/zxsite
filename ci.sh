#!/bin/sh
npm install
webpack -pw
pm2 restart 0
