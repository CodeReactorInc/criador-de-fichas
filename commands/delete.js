var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var ficha = JSON.parse(fs.readFileSync('./storage/fichas.json', 'utf8'));
var hpS = JSON.parse(fs.readFileSync('./storage/hp.json', 'utf8'));

exports.run = (client, message, args, prefix) => {

if (args[0] === undefined) {

var user = message.author.id;
if (ficha[user] === undefined) {
message.channel.send({embed: {
  title: "Delete",
  description: "Você não tem uma ficha",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
 }
delete ficha[user];
fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
if (hpS[user] !== undefined) {
delete hpS[user];
fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
if (err) console.error(err)
});
}
message.channel.send({embed: {
  title: "Delete",
  description: "Sua ficha foi apaga com sucesso",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});

} else if (args[0].startsWith('<@') && args[0].endsWith('>')) {
if (!message.member.hasPermission('ADMINISTRATOR')) {
message.channel.send({embed: {
  title: "Delete",
  description: "Você não tem permissão para isso",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
}
var user = message.mentions.users.first().id;
if (ficha[user] === undefined) {
message.channel.send({embed: {
  title: "Delete",
  description: `<@${user}> não tem ficha`,
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
 }
delete ficha[user];
fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
if (hpS[user] !== undefined) {
delete hpS[user];
fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
if (err) console.error(err)
});
}
message.channel.send({embed: {
  title: "Delete",
  description: `A ficha de <@${user}> foi apaga com sucesso`,
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
} else {
message.channel.send({embed: {
  title: "Delete",
  description: "Algo deu errado",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
}
}