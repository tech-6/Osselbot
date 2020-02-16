@ECHO OFF
#clears the terminal
ECHO "Updating..."
cd C:\Technicolor_Bot\
git pull Technicolor_Bot
npm install discord.js

ECHO "Running bot"
node C:\Technocolor_Bot\src\index.js
