const { ShardingManager } = require('discord.js');
const manager = new ShardingManager('./bot.js', { token: 'Njc4MDkzNjY4NzcwNTEyOTE3.XkdyyA.6n4wvPmzOw-fwuysEoTPU8Cv2x0' });

manager.spawn();
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
