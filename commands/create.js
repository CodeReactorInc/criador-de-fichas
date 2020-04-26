var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var ficha = JSON.parse(fs.readFileSync('./storage/fichas.json', 'utf8'));
var hpS = JSON.parse(fs.readFileSync('./storage/hp.json', 'utf8'));

exports.run = (client, message, args) => {

if (ficha[message.author.id] !== undefined) return message.channel.send({embed: {
  title: "Ficha",
  description: "Você já tem uma ficha :'3",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 
ficha[message.author.id] = {}

var filter = m => m.author.id === message.author.id;

message.channel.send({embed: {
  title: "Ficha",
  description: "Por favor, forneça o nome do personagem",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});

var nameC = message.channel.createMessageCollector(filter, { time: 20000 });

nameC.on('collect', m => {

message.channel.send({embed: {
  title: "Ficha",
  description: `Seu nome foi definido para **${m.content}**`,
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 
ficha[message.author.id].name = m.content;
 
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
nameC.stop();
 });
 
nameC.on('end', m => {

if (ficha[message.author.id].name === undefined) { return message.channel.send({embed: {
  title: "Ficha",
  description: "O tempo acabou :c",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 } else gender();
});

function gender() {

message.channel.send({embed: {
  title: "Ficha",
  description: "Por favor, forneça o gênero do personagem (F/M)",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 
var sexoC = message.channel.createMessageCollector(filter, { time: 20000 });

sexoC.on('collect', m => {

if (m.content === "f" || m.content === "F") {

message.channel.send({embed: {
  title: "Ficha",
  description: "Seu sexo foi definido para **Feminino**",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 
ficha[message.author.id].gender = "Feminino";
 
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});

} else if (m.content === "m" || m.content === "M") {

message.channel.send({embed: {
  title: "Ficha",
  description: "Seu sexo foi definido para **Masculino**",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 
ficha[message.author.id].gender = "Masculino";
 
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});

} else {
message.channel.send({embed: {
  title: "Ficha",
  description: "Você não seguiu as regras",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 delete ficha[message.author.id];
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
return
}
sexoC.stop();
});

sexoC.on('end', m => {
if (ficha[message.author.id] !== undefined) {
 if (ficha[message.author.id].gender === undefined) {
message.channel.send({embed: {
  title: "Ficha",
  description: "O tempo acabou :c",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 delete ficha[message.author.id];
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
return
} else {
age();
}
}
});
}

function age() {
message.channel.send({embed: {
  title: "Ficha",
  description: "Por favor, forneça a idade do personagem (" + config.ficha.minAge + " a " + config.ficha.maxAge + ")",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});

var ageC = message.channel.createMessageCollector(filter, { time: 20000 });

ageC.on('collect', m => {

var conteudo = parseInt(m.content, 10);
var idadeMax = parseInt(config.ficha.maxAge, 10);
var idadeMin = parseInt(config.ficha.minAge, 10);
var max = ( conteudo >= idadeMin );
var min = ( conteudo <= idadeMax );

if (isNaN(conteudo)) {
message.channel.send({embed: {
  title: "Ficha",
  description: "Você não seguiu as regras",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 delete ficha[message.author.id];
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
return
}
 
if (!Number.isInteger(conteudo)) {
message.channel.send({embed: {
  title: "Ficha",
  description: "Você não seguiu as regras",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 delete ficha[message.author.id];
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
return
}

if (max === false) {
message.channel.send({embed: {
  title: "Ficha",
  description: "Você não seguiu as regras",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 delete ficha[message.author.id];
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
return
} else if (min === false) {
message.channel.send({embed: {
  title: "Ficha",
  description: "Você não seguiu as regras",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 delete ficha[message.author.id];
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
return
}

message.channel.send({embed: {
  title: "Ficha",
  description: `Sua idade foi definida para ${conteudo}`,
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 
ficha[message.author.id].age = conteudo;
 
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
ageC.stop();
});
ageC.on('end', m => {

if (ficha[message.author.id] !== undefined) {
if (ficha[message.author.id].age === undefined) {
message.channel.send({embed: {
  title: "Ficha",
  description: "O tempo acabou :c",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 delete ficha[message.author.id];
 fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
return
} else {
hell();
}
}
});
}
function hell() {

ficha[message.author.id].hp = config.ficha.health;

var minS = config.ficha.minStatus;
var maxB = config.ficha.maxStatus;

var basic = ficha[message.author.id];

var maxS =  maxB - minS;

basic.strength = Math.floor(Math.random() * maxS) + minS;
basic.dexterity = Math.floor(Math.random() * maxS) + minS;
basic.perspective = Math.floor(Math.random() * maxS) + minS;
basic.intelligence = Math.floor(Math.random() * maxS) + minS;
basic.charism = Math.floor(Math.random() * maxS) + minS;

var car = basic.charism;
var ini = basic.intelligence;

var soma = car + ini;
var sanityInt = soma / 2;
var sanity = parseInt(sanityInt, 10);

basic.sanity = sanity;

fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
verify();
}

function verify() {

hpS[message.author.id] = {};
hpS[message.author.id].hp = ficha[message.author.id].hp;
hpS[message.author.id].sanity = ficha[message.author.id].sanity;

fs.writeFile('./storage/hp.json', JSON.stringify(hpS, null, 4), (err) => {
if (err) console.error(err)
});

message.guild.members.get(message.author.id).setNickname(ficha[message.author.id].name);

message.channel.send({embed: {
  title: "Verify",
  description: "Você foi verificado!",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
}
}