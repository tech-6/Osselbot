#!/usr/bin/env node
// Load up the libraries
const Discord = require("discord.js");
const prettyMilliseconds = require('pretty-ms');
const config = require("./config.json");
// This is the client
const client = new Discord.Client();
client.on("ready", () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
	// Example of changing the bot's playing game to something useful. `client.user` is what the
	// docs refer to as the "ClientUser".
	client.user.setActivity(`${client.users.cache.size} of you horrible people`,{ type: 'LISTENING' });
});
//Updates people count
client.on('guildMemberAdd', member => {
	console.log(`New member joined: ${member.name} (id: ${member.id}).`);
	client.user.setActivity(`${client.users.cache.size} of you horrible people`,{ type: 'LISTENING' });
});
client.on('guildMemberRemove', member => {
	console.log(` member left: ${member.name} (id: ${member.id}).`);
  	client.user.setActivity(`${client.users.cache.size} of you horrible people`,{ type: 'LISTENING' });
});
////// ACTUAL MESSAGE PROCESSING
client.on("message", async message => {
//stops bots from activating the Osselbot
if(message.author.bot) return;
//Bad people blocker **NEEDS TO REVISE DETAIN SCRIPT**
if(message.content.toLowerCase().includes('nigger',"nigga","niglet","nigglet")){
  message.member.roles.add('654366653093642241').catch(console.error);
      message.member.roles.remove('514254335425773589').catch(console.error);
  console.log(`${message.member} has been detained`)
  return message.reply('Member has been D E T A I N E D <:yikes:632660765878255636>')
}


}

//Logging in the bot
client.login(config.token)
