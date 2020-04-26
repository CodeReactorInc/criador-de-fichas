var fs = require('fs');
var ficha = JSON.parse(fs.readFileSync('./storage/fichas.json', 'utf8'));
var hpS = JSON.parse(fs.readFileSync('./storage/hp.json', 'utf8'));

exports.run = (client, message, args, prefix) => {

if (!message.member.hasPermission('ADMINISTRATOR')) {
message.channel.send({embed: {
  title: "Remove",
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
  title: "Remove",
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
  title: "Remove",
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
var basic = hpS[user];
if (basic === undefined) {
message.channel.send({embed: {
  title: "Remove",
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
message.channel.send({embed: {
  title: "Remove",
  description: "Defina se é **hp** ou **sd**",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
} else if (args[1] === 'hp') {
if (args[2] === undefined) {
message.channel.send({embed: {
  title: "Remove",
  description: "Por favor cite um número",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
 }
var numero = parseInt(args[2], 10);
if (isNaN(numero)) {
message.channel.send({embed: {
  title: "Remove",
  description: "Por favor cite um número",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
 }
if (!Number.isInteger(numero)) {
message.channel.send({embed: {
  title: "Remove",
  description: "Por favor cite um número inteiro",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
 }
var editThis = basic.hp;
var result = ( editThis < numero );
var name = ficha[user].name;

if (result === true) {
message.channel.send({embed: {
  title: "Remove",
  description: "**" + name + "** morreu",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 var value = 0;
 delete ficha[user];
 delete hpS[user];
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
if (err) console.error(err)
});
});
 } else {
  var value = ( editThis - numero );
 message.channel.send({embed: {
  title: "Remove",
  description: "**" + name + "** tomou **" + numero + "** de dano",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
}
hpS[user].hp = value;
fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
if (err) console.error(err)
});
} else if (args[1] === 'sd') {
if (args[2] === undefined) {
message.channel.send({embed: {
  title: "Remove",
  description: "Por favor cite um número",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
 }
var numero = parseInt(args[2], 10);
if (isNaN(numero)) {
message.channel.send({embed: {
  title: "Remove",
  description: "Por favor cite um número",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
 }
if (!Number.isInteger(numero)) {
message.channel.send({embed: {
  title: "Remove",
  description: "Por favor cite um número inteiro",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
 }
var editThis = basic.sanity;
var result = ( editThis < numero );
var name = ficha[user].name;

if (result === true) {
message.channel.send({embed: {
  title: "Remove",
  description: "**" + name + "** está enlouquecendo",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 var value = 0;
 } else {
  var value = ( editThis - numero );
 message.channel.send({embed: {
  title: "Remove",
  description: "**" + name + "** perdeu **" + numero + "** de sanidade",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
}
hpS[user].sanity = value;
fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
if (err) console.error(err)
});
}
}