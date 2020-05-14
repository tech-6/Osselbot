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
	//Message processing
	if(message.author.bot) return;
	if(message.content.indexOf(config.prefix) !== 0) return;
	// Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
	//////////////////////////////////////////////////////////////////////////////
	//COMMAND TIME
	//////////////////////////////////////////////////////////////////////////////
	if (command === "reboot"){
		function shutdown(){
			client.destroy();
			process.exit(69);
			}
		if (message.author.id === '216042720047661057') {
			message.reply("**Authenticated**, Restarting now.");
			client.user.setActivity(`Itself die`,{ type: 'WATCHING' });
			setTimeout(shutdown, 5000, 'shutdown');
		}
		else {
			return message.reply("No");
		};
	};
	//////////////////////////////////////////////////////////////////////////////
	if (command === "stats") {
		let embed = new Discord.MessageEmbed()
		.setTitle('Stats')
		.setColor(0x195080)
		.setDescription(`\
**Stats for 0SSELB0T** \n \
**Uptime:** ${prettyMilliseconds(client.uptime)} \n \
**Started at:** ${client.readyAt} \n \
**People:** ${client.users.cache.size}\
`);
		return message.channel.send(embed);
	};
	//////////////////////////////////////////////////////////////////////////////
	

});

//Logging in the bot
client.login(config.token)
