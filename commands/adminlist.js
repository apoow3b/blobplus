const Discord = require("discord.js");

  module.exports.run = async (client, message, args) => {
    var str_filtrer = message.guild.members.cache.filter(member => member.hasPermission("ADMINISTRATOR"))
    var str_map = str_filtrer.map(m => `${m.user.username} [${m.user.id}]`).join("\n")
    for(let i = 0; i < str_map.length; i += 1995) {
        const str_content = str_map.substring(i, Math.min(str_map.length, i + 1995));
    const embed = new Discord.MessageEmbed()
    .setTitle(`Admins List`)
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setTimestamp()
    .setDescription(`List of Admin in \`${message.guild.name}\` (**${str_filtrer.size}**):\`\`\`${str_content}\`\`\``)
    .setColor("fcc21b")
    message.channel.send(embed)
    }
    };
    
    module.exports.help = {
      name: "adminlist",
      aliases: []
    };