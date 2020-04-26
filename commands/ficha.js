var fs = require('fs');
var ficha = JSON.parse(fs.readFileSync('./storage/fichas.json', 'utf8'));

exports.run = (client, message, args) => {

if (args[0] === undefined) {
var user = message.author.id;
} else {
var user = message.mentions.users.first().id;
}

if (user === undefined) {
message.channel.send({embed: {
  title: "Ficha",
  description: "Algo deu errado :c",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
return
}

var basic = ficha[user];

if (basic === undefined) {
message.channel.send({embed: {
  title: "Ficha",
  description: "<@" + user + "> não tem uma ficha",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
return
}

var totalStatus = ( basic.strength + basic.dexterity + basic.perspective + basic.intelligence + basic.charism );

message.channel.send({embed: {
  title: "Ficha",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  },
  fields: [
  {
  name: 'Nome',
  value: `${basic.name}`
  },
  {
  name: 'Gênero',
  value: `${basic.gender}`
  },
  {
  name: 'Idade',
  value: `${basic.age}`
  },
  {
  name: 'HP',
  value: `${basic.hp}`
  },
  {
  name: 'Sanidade',
  value: `${basic.sanity}`
  },
  {
  name: 'Força',
  value: `${basic.strength}`
  },
  {
  name: 'Destreza',
  value: `${basic.dexterity}`
  },
  {
  name: 'Perspectiva',
  value: `${basic.perspective}`
  },
  {
  name: 'Inteligência',
  value: `${basic.intelligence}`
  },
  {
  name: 'Carisma',
  value: `${basic.charism}`
  },
  {
  name: 'Status Total',
  value: `${totalStatus}`
  }
  ] 
 }});
}