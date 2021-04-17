#!/bin/sh
cd "./"
currentdir=`pwd`
npm install
pm2 stop TheatreTicketsServer
pm2 delete TheatreTicketsServer
pm2 start process.json --env dev
exit;