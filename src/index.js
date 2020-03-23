const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js',config.token);
const config = require("./config.json");

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
