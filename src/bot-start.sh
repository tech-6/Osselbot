#!/usr/bin/env bash
echo "Updating"
#Update Node Based stuff
cd ~/Osselbot/
n stable
npm upgrade
#update code
git pull --force
#Starts the bot
cd ./src
echo "STARTING"
node index.js
