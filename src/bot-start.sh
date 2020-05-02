#!/usr/bin/env bash
echo "Updating"
#Update Node Based stuff
cd /home/ec2-user/github/Osselbot/
nvm node
npm upgrade
#update code
git pull --force
#Starts the bot
cd ./src
echo "STARTING"
node index.js
