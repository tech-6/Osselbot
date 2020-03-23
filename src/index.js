const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js',config.token);

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
