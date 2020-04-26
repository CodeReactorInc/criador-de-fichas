
exports.run = (client, message, args) => {

 message.channel.send({embed: {
  title: "Sem pong por aqui!",
  description: Math.round(client.ping) + "ms",
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  }
 }});
}