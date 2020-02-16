#!/usr/bin/env bash
echo "Updating"
#update everything
cd /home/tech1/Osselbot/
npm install discord.js
git pull --force
echo "STARTING"
node ./src/index.js
