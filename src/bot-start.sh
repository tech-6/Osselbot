#!/usr/bin/env bash
echo "Updating"
#update everything
/home/tech1/Osselbot/
npm install discord.js
git pull Osselbot
echo "STARTING"
node ./src/index.js
