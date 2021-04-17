#!/bin/sh
cd "./"
currentdir=`pwd`
pm2 stop TheatreTicketsServer
pm2 delete TheatreTicketsServer
exit;