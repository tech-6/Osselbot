#!/usr/bin/env bash
echo "Updating"
#Update Node Based stuff
n stable
npm upgrade discord.js
#update code
cd /home/tech1/Osselbot/
git pull --force
#Starts the bot
cd ./src
echo "STARTING"
node index.js
