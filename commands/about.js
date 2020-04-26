exports.run = (client, message, args, ext) =>  {
    var toni = message.guild.members.get('268005452913180672');
    var eu = message.guild.members.get('363482769075994624');
    message.channel.send({embed: {
        title: "Um pouco sobre mim",
        description: "Criador de Fichas (Edição Toni) "+ext.data.version,
        color: 0x6000ff,
        footer: {
            text: "Soft Dynamics - Placeholder",
            icon_url: "https://cdn.discordapp.com/emojis/548570977471168512.png"
        },
        fields: [
            {
                name: "Quem me criou?",
                value: "**"+eu.user.tag+"** em nome da [Soft Dynamics](https://softdynamics.tk) me criou para ser o escravo de **"+toni.user.tag+"**"
            },
            {
                name: "Servidor de suporte em Inglês",
                value: "https://discord.gg/Tk9FTMB"
            }
        ],
        thumbnail: {
            url: client.user.avatarURL
        }
    }});
}