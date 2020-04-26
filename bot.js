var Discord = require('discord.js');
var client = new Discord.Client();
var fs = require('fs');

var token = JSON.parse(fs.readFileSync('./config.json', 'utf8')).bot.token;
var version = "v3.0 Beta";
var ext = {
    data: {
        version: version
    },
    dev: false
};

client.on('message', async message => {
    
    var ficha = JSON.parse(fs.readFileSync('./storage/fichas.json', 'utf8'));
    var hpS = JSON.parse(fs.readFileSync('./storage/hp.json', 'utf8'));
    var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
    
    ext.storage = {};
    ext.storage.ficha = ficha;
    ext.storage.hps = hpS;
    ext.storage.config = config;
    
    function _writeFicha(data) {
        fs.writeFile('./storage/fichas.json', JSON.stringify(data, null, 4), (err) => {
            if (err) console.error(err)
        });
    }
    function _writeHPS(data) {
        fs.writeFile('./storage/hp.json', JSON.stringify(data, null, 4), (err) => {
            if (err) console.error(err)
        });
    }
    function _writeConfig(data) {
        fs.writeFile('./config.json', JSON.stringify(data, null, 4), (err) => {
            if (err) console.error(err)
        });
    }
    
    ext.storage.write = {};
    ext.storage.write.writeFicha = _writeFicha;
    ext.storage.write.writeHPS = _writeHPS;
    ext.storage.write.writeConfig = _writeConfig;
    
    ext.data.prefix = ext.storage.config.bot.prefix;
    var prefix = ext.data.prefix;
    
    var msg = message.content.toUpperCase();
    var sender = message.author;
    var args = message.content.slice(prefix.length).trim().split(' ');
    var cmd = args.shift().toLowerCase();
    
    if (message.author.bot) return;
    if (!msg.startsWith(prefix)) return;
    
    try {
        delete require.cache[require.resolve(`./commands/${cmd}.js`)];
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args, ext);
    } catch (e) {
        console.log(e.stack);
    }
});

client.on('guildMemberRemove', member => {

    var ficha = JSON.parse(fs.readFileSync('./storage/fichas.json', 'utf8'));
    var hpS = JSON.parse(fs.readFileSync('./storage/hp.json', 'utf8'));

    if (ficha[member.id] !== undefined) {
        delete ficha[member.id];
        fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
            if (err) console.error(err)
        });
    }
    if (hpS[member.id] !== undefined) {
        delete hpS[member.id];
        fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
            if (err) console.error(err)
        });
    }

    client.guilds.get('566658307276931103').channels.get('566658307989831740').send({embed: {
        title: "Alguém saiu, infelizmente :c",
        description: member.user.username + " saiu e teve sua ficha deletada",
        color: 0x00ff00,
        footer: {
            text: "Soft Dynamics - Placeholder",
            icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
        }
    }});
});

client.on('ready', () => {

    client.user.setStatus('invisible');
    copyright();

    function copyright() {
        client.user.setActivity('&help | Soft Dynamics', { type: 'PLAYING' });
        setTimeout(virtual, 15000);
    }

    function virtual() {
        client.user.setActivity('&help | Use Virtual Money Bot!', { type: 'PLAYING' });
        setTimeout(version, 15000);
    }

    function version() {
        client.user.setActivity('&help | '+version, { type: 'PLAYING' });
        setTimeout(github, 15000);
    }
    
    function github() {
        client.user.setActivity('&help | github.com/soft-dynamics', { type: 'PLAYING' });
        setTimeout(copyright, 15000);
    }
    
    function maintence() {
        client.user.setActivity('&help | Em manutenção', { type: 'PLAYING' });
        setTimeout(copyright, 15000);
    }
    
    console.log(`Eu sou o ${client.user.tag} e estou com ${client.shard.count} shards`);

});

client.on('disconnect', () => {
    console.log('Disconnnecting: '+client.shard.id);
});

client.on('reconnecting', () => {
    console.log('Reconnecting: '+client.shard.id);
});

client.on('error', () => {
    console.log('A error has occurred: '+client.shard.id);
});

client.on('resume', () => {
    console.log('Connected again!');
});


client.login(token)