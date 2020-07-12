#!/usr/bin/env node
//TODO Write tests
//TODO Test all commands

//Those are so I remember stuff

// Load up the libraries
const Discord = require("discord.js");
const prettyMilliseconds = require('pretty-ms');
const fs = require('fs');
const homedir = require('os').homedir;
const info = require("../package.json");
// const fetch = require('node-fetch');
//importing files
const config = require("./config.json");
// This is making clients
const client = new Discord.Client();


function activity() {
	client.user.setActivity(`${client.users.cache.size} of you horrible people`, {type: 'LISTENING'}).then(() => {
	});
}

client.on("ready", () => {
	// This event will run if the bot starts, and logs in, successfully.
	console.log(`Bot has started, with ${client.users.cache.size} users, in ${client.channels.cache.size} channels of ${client.guilds.cache.size} guilds.`);
	// Example of changing the bot's playing game to something useful. `client.user` is what the
	// docs refer to as the "ClientUser".
	activity();
});
//Updates people count
client.on('guildMemberAdd', member => {
	console.log(`New member joined: ${member.nickname} (id: ${member.id}).`);
	activity();
});
client.on('guildMemberRemove', member => {
	console.log(` member left: ${member.nickname} (id: ${member.id}).`);
	activity();
});

setInterval(activity, 300000);

////// ACTUAL MESSAGE PROCESSING
client.on("message", async message => {
	//stops bots from activating the Osselbot

	//Message processing

	// noinspection SpellCheckingInspection
	if (message.content.toLowerCase().includes('nigg'||'negro'||'niglet'||'fag'||'f4g'||'n1gg'||'gg3r')) {
		await message.delete();
		return message.reply(`Listen here cum-sock we dont appreciate that here ${message.member}. If you gonna be like that you may just well end up in the JAR and we all know how that ends...`)
	}


	if (message.author.bot) return;
	if (message.content.indexOf(config.prefix) !== 0) return;
	// Here we separate our "command" name, and our "arguments" for the command.
	// e.g. if we have the message "+say Is this the real life?" , we'll get the following:
	// command = say
	// args = ["Is", "this", "the", "real", "life?"]
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	//////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////COMMAND TIME////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////

	if (command === "stats") {
		let embed = new Discord.MessageEmbed()
			.setTitle('Stats')
			.setAuthor("Osselbot", "https://cdn.discordapp.com/attachments/597814181084921866/711843993914310656/animated-beach-balls-29.gif")
			.setColor(0x195080)
			.setDescription(`\
**Stats for 0SSELB0T** \n \
**Uptime:** ${prettyMilliseconds(client.uptime)} \n \
**Started at:** ${client.readyAt} \n \
**People:** ${client.users.cache.size}`)
			.setFooter(`osselbot v${info.version} run version for full info`);
		return message.channel.send(embed);
	}
	//////////////////////////////////////////////////////////////////////////////
	if (command === "ping") {
		// Calculates ping between sending a message and editing it, giving a nice round-trip latency.
		const m = await message.channel.send("Ping?");
		await m.edit(`Pong! Latency is ${client.ws.ping}ms`);
	}

	//HOW QUOTEABLE
	if (command === "psych") {
		return message.channel.send("Rules for finding a psychopath: \n1. Favorite color is orange \n2. Likes the left burners, worse if its top left\n3. Calls pizza sauce/tomato sauce gravy\n4. Doesnt like salad\n5. Likes country music\n6. Makes hot chocolate with water\n7. Likes black licorice")
	}

	if (command === "ask") {
		return message.channel.send("Dont Ask, Just ask!\n https://iki.fi/sol/dontask.html")
	}

	if (command === "simp") {
		if (!message.member.roles.cache.some(r => ["Admin", "Moderator", "Member of the Order of the b l u e", "Botmeister"].includes(r.name)))
			return message.reply("Sorry, you don't have permissions to use this!");
		let embed = new Discord.MessageEmbed()
			.setTitle("SIMP Alert")
			.setURL("https://www.youtube.com/watch?v=c3m4Q07TkMk")
			.setColor(0x195080)
			.setDescription("__**ALERT**__ SIMP detected!")
			.setImage("https://vignette.wikia.nocookie.net/disney/images/6/64/Kronk_.jpg/revision/latest?cb=20160720194635")
			.setTimestamp()
		await message.channel.send({embed})
	}

	if (command === "squad") {
		let min = Math.ceil(0);
		let max = Math.floor(11);
		let rate = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
		return message.reply(`The squad rates this ${rate} out of 10`);
	}

	if (command === "magic") {
		return message.channel.send("Do you believe in magic in a young girl's heart\nHow the music can free her, whenever it starts\nAnd it's magic, if the music is groovy\nIt makes you feel happy like an old-time movie\nI'll tell you about the magic, and it'll free your soul\nBut it's like trying to tell a stranger bout 'rock and roll'");
	}

	if (command === 'help') {
		return message.reply('https://technicolor.2a03.party/bot/');
	}

	if (command === "fix") {
		if (message.member.roles.cache.some(r => ["Ally of the Order"].includes(r.name))) {
			return message.channel.send("I guess it's my fault will fix.");
		}
		return;
	}

	if (command === "va") {
		let msg = ""
		let num = Math.floor(Math.random() * (5 - 1) + 1); //The maximum is exclusive and the minimum is inclusive
		switch (num) {
			case 1:
				msg = "its simple, mind over matter. i dont mind, and you dont fucking matter";
				break;
			case 2:
				msg = "I can eat alphabet soup and shit out a more coherent sentence than you";
				break;
			case 3:
				msg = "you are living proof darwinism is dead, hell, even reversing.";
				break;
			case 4:
				msg = "may you never reproduce"
				break;
		}
		return message.reply(`${msg}`)
	}
////////////////////////////////////////////////////////////////////////////////
	if (command === "say") {
		// makes the bot say something and delete the message. As an example, it's open to anyone to use.
		// To get the "message" itself we join the `args` back into a string with spaces:
		const sayMessage = args.join(" ");
		if (message.member.roles.cache.some(r => ["Admin", "Mods", "Member of the Order", "Botmeister", "Ally of the Order", "say"].includes(r.name))) {
			if (message.content.includes("@")) {
				return message.reply("haha no")
			}
			// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.

			message.delete().catch(() => {
			});
			// And we get the bot to say the thing:
			return message.channel.send(sayMessage);
		}
	}

////////////////////////////////////////////////////////////////////////////////
	if (command === "quote") {

		let quotes = require(`${homedir}/quotes.json`);
		let quoteadd = "";
		let selector;
		try {
			selector = args[0].toLowerCase();
		} catch (err) {
			let number = quotes.quotes.length + 1;
			let quotesend = Math.floor(Math.random() * (number));
			return message.channel.send(`${quotes.quotes[quotesend]}`);
		}
		if (selector === "add") {
			if (!(message.member.roles.cache.some(r => ["Admin", "Mods", "Member of the Order", "Botmeister", "Ally of the Order", "say"].includes(r.name)))) return message.reply("Ask someone with a quote role to add that.")
			args.shift();
			//This does logic to make it from an array to a nice string.
			quoteadd = args.join(' ');
			quotes.quotes.push(quoteadd)
			fs.writeFile(`${homedir}/quotes.json`, JSON.stringify(quotes, null, 2), (err) => {
				if (err) return message.reply("Something went wrong");
				client.channels.cache.get('712084662033580064').send(`${message.member} has submitted \`${quoteadd}\` to the quote repository`);
				return message.reply("Quote added to repository");
			});
		} else {
			return message.reply("you can add quotes by running `?quote add <person> Quote goes here`");
		}
	}
////////////////////////////////////////////////////////////////////////////////
	if (command === "version") {
		return message.channel.send(`\`\`\`\
 ________________________________________\n \
< @technicolor-creamsicle/osselbot@v${info.version}>\n \
 ----------------------------------------\n \
        \\   ^__^\n \
         \\  (oo)\\_______\n \
            (__)\\       )\\/\\\n \
                ||----w |\n \
                ||     ||\n \
\`\`\``)
	}


////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////DEFCON//////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
	if (command === "defcon") {
		//5 levels till ban
		if (!message.member.roles.cache.some(r => ["Admin", "Member of the Order of the b l u e", "Botmeister"].includes(r.name)))
			return message.reply("Sorry, you don't have permissions to use this!");
		else {
			let member = message.mentions.members.first();
			let role;
			switch (parseInt(args[1], 10)) {
				case 5:
					role = message.guild.roles.cache.find(role => role.name === `DEFCON 5`);
					await member.roles.add(role);
					break;
				case 4:
					role = message.guild.roles.cache.find(role => role.name === `DEFCON 4`);
					await member.roles.add(role);
					break;
				case 3:
					role = message.guild.roles.cache.find(role => role.name === `DEFCON 3`);
					await member.roles.add(role);
					break;
				case 2:
					role = message.guild.roles.cache.find(role => role.name === `DEFCON 2`);
					await member.roles.add(role);
					break;
				case 1:
					role = message.guild.roles.cache.find(role => role.name === `DEFCON 1`);
					await member.roles.add(role);
					break;
				default:
					return message.reply(`DEFCON not set is ${args[1]} a number between 1-5?`);
			}
			return message.reply(`\n**DEFCON** level set to DEFCON ${args[1]}\nGod Bless their souls`);
		}
	}
});

if (process.argv.slice(2).includes("--TEST")) {
	console.log("Test Pass!");
	process.exit(0);
}

//Logging in the bot
client.login(config.token).then(() => {
	console.log("Logged in")
});