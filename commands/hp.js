var fs = require('fs');
var ficha = JSON.parse(fs.readFileSync('./storage/fichas.json', 'utf8'));
var hpS = JSON.parse(fs.readFileSync('./storage/hp.json', 'utf8'));

exports.run = (client, message, args, prefix) => {

if (args[0] === undefined) {
var user = message.author.id;
} else {
var user = message.mentions.users.first().id;
}

if (user === undefined) {
message.channel.send({embed: {
  title: "HP",
  description: "Algo deu errado :c",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
return
}
if (hpS[user] === undefined) {
message.channel.send({embed: {
  title: "HP",
  description: `Você precisa verificar sua ficha ou criar uma usando **${prefix}create** ou **${prefix}verify**`,
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
return
}

var people = ficha[user].name;
var totalHP = ficha[user].hp;
var totalSanity = ficha[user].sanity;
var curHP = hpS[user].hp;
var curSanity = hpS[user].sanity;

message.channel.send({embed: {
  title: "HP - " + people,
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  },
  fields: [
  {
  name: "Vida",
  value: `${curHP}/${totalHP}`
  },
  {
  name: "Sanidade",
  value: `${curSanity}/${totalSanity}`
  }
  ]
 }});
}