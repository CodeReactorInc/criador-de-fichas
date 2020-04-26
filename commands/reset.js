var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var ficha = JSON.parse(fs.readFileSync('./storage/fichas.json', 'utf8'));
var hpS = JSON.parse(fs.readFileSync('./storage/hp.json', 'utf8'));

exports.run = (client, message, args, prefix) => {

if (!message.member.hasPermission('ADMINISTRATOR')) {
message.channel.send({embed: {
  title: "Reset",
  description: "Você não tem permissão para isso",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
}

if (args[0] === undefined) {
message.channel.send({embed: {
  title: "Reset",
  description: "Por favor, coloque uma mencão",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
}

if (!args[0].startsWith('<@') && !args[0].endsWith('>')) {
message.channel.send({embed: {
  title: "Reset",
  description: "Por favor, coloque uma menção",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
}
var user = message.mentions.users.first().id;
if (hpS[user] === undefined) {
message.channel.send({embed: {
  title: "Reset",
  description: "Este membro não foi verificado",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
}
if (args[1] === undefined) {
hpS[user].hp = ficha[user].hp;
hpS[user].sanity = ficha[user].sanity;
fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
if (err) console.error(err)
});
message.channel.send({embed: {
  title: "Reset",
  description: "**" + ficha[user].name + "** teve sua **vida** e **sanidade** resetado",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
} else if (args[1] === 'hp') {
hpS[user].hp = ficha[user].hp;
fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
if (err) console.error(err)
});
message.channel.send({embed: {
  title: "Reset",
  description: "**" + ficha[user].name + "** teve sua **vida** resetado",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
} else if (args[1] === 'sd') {
hpS[user].sanity = ficha[user].sanity;
fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
if (err) console.error(err)
});
message.channel.send({embed: {
  title: "Reset",
  description: "**" + ficha[user].name + "** teve sua **sanidade** resetado",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
} else {
message.channel.send({embed: {
  title: "Reset",
  description: "Deixe o campo vazio ou use **hp** ou **sd**",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
}
}