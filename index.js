var { ShardingManager } = require('discord.js');
var manager = new ShardingManager('./bot.js');
manager.spawn(1);