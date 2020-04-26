exports.run = (client, message, args, prefix) => {

message.channel.send({embed: {
  title: "Help",
  description: 'Um comando de ajuda para pessoas novas\n**() = opcional, <> = requerido**',
  color: 0x00ff00,
  footer: {
   text: "Soft Dynamics - Custom database bot",
   icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
  },
  fields: [
  {
  name: prefix + "create",
  value: "Os argumentos serão pedidos aos poucos"
  },
  {
  name: prefix + "rename",
  value: "Edita o seu nome na ficha"
  },
  {
  name: prefix + "delete (menção)",
  value: "Apenas moderadores podem apagar ficha de outras pessoas"
  },
  {
  name: prefix + "reset <menção> (hp/sd)",
  value: "Comando exclusivo de administradores"
  },
  {
  name: prefix + "ad <menção> <hp/sd> <número>",
  value: "Comando exclusivo de administradores"
  },
  {
  name: prefix + "rm <menção> <hp/sd> <número>",
  value: "Comando exclusivo de administradores"
  },
  {
  name: prefix + "ping",
  value: "Mostra a ping em milisegundos do bot"
  },
  {
  name: prefix + "ficha (menção)",
  value: "Mostre a sua ou a ficha de outra pessoas por meio da menção"
  },
  {
  name: prefix + "hp (menção)",
  value: "Mostre a quantidade de vida do seu personagem ou da pessoa mencionada"
  },
  {
  name: prefix + "roll <número máximo> (quantidade até 3)",
  value: "Usado para obter números aleatórios"
  },
  {
  name: prefix + "about",
  value: "Veja algumas informações sobre o bot"
  }
  ]
 }});
 
}