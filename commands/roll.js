exports.run = (client, message, args, prefix) => {

if (args[0] === undefined) {
message.channel.send({embed: {
  title: "Roll",
  description: "Por favor coloque a quantidade máxima",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
 return
}
if (isNaN(args[0])) {
message.channel.send({embed: {
  title: "Roll",
  description: "Por favor coloque a quantidade máxima em números",
  color: 0xff0000,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
return
}
var cu = parseInt(args[0], 10);
var bosta = Math.floor(Math.random() * cu);
var urina = Math.floor(Math.random() * cu);
var bunda = Math.floor(Math.random() * cu);


if (args[1] === undefined || args[1] === '1') {
message.channel.send({embed: {
  title: "Roll",
  description: "O resultado foi **" + bosta + "**",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
} else if (args[1] === '2') {
message.channel.send({embed: {
  title: "Roll",
  description: "O resultado foi **" + bosta + "** e **" + urina + "**",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
} else {
message.channel.send({embed: {
  title: "Roll",
  description: "O resultado foi **" + bosta + "** e **" + urina + "** e **" + bunda + "**",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
}
}