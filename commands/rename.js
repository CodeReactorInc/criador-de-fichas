var fs = require('fs');
var ficha = JSON.parse(fs.readFileSync('./storage/fichas.json', 'utf8'));

exports.run = (client, message, args) => {

if (ficha[message.author.id] === undefined) {
message.channel.send({embed: {
  title: "Rename",
  description: "Você não tem uma ficha",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
}
ficha[message.author.id].rename = 'false';
fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});
var filter = m => m.author.id === message.author.id;
message.channel.send({embed: {
  title: "Rename",
  description: "Por favor, forneça o nome do personagem",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 
var nameC = message.channel.createMessageCollector(filter, { time: 8000 });

nameC.on('collect', m => {

ficha[message.author.id].rename = 'true';

message.channel.send({embed: {
  title: "Rename",
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
message.guild.members.get(message.author.id).setNickname(ficha[message.author.id].name);
nameC.stop();
 });
 
nameC.on('end', m => {

if (ficha[message.author.id].rename === 'false') {
 message.channel.send({embed: {
  title: "Rename",
  description: "O tempo acabou :c",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
}
ficha[message.author.id].rename = 'false';
fs.writeFile('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});

delete ficha[message.author.id].rename;

fs.writeFileSync('./storage/fichas.json', JSON.stringify(ficha, null, 4), (err) => {
if (err) console.error(err)
});

});
}