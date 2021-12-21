    module.exports.run = async (client, message, args) => {

      const { MessageEmbed } = require("discord.js");
      if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`<:bloberror:869118676740239411> I don't have the permissions \`\`\`Permissions: MANAGE_CHANNELS\`\`\``)
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:bloberror:869118676740239411> You don't have the permission to use this command! \`\`\`Permissions: MANAGE_MESSAGES\`\`\``);
      message.channel.clone({reason: `${message.author.tag} (${message.author.id})`}).then(c => c.setPosition(message.channel.position) && c.send(`<a:blobbomb:869206354403942420> ${message.author} has nuked this channel!`))
      message.channel.delete() 
    
    };
    
    module.exports.help = {
      name: "nuke",
      aliases: ["renew", "explode"]
    };