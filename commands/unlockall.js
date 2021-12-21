module.exports.run = async (client, message, args) => {

  const { MessageEmbed } = require("discord.js");
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`<:bloberror:869118676740239411> You don't have the permission to use this command! \`\`\`Permissions: ADMINISTRATOR\`\`\``)
  if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_CHANNELS")) return message.channel.send(`<:bloberror:869118676740239411> I don't have the permissions \`\`\`Permissions: MANAGE_CHANNELS\`\`\``)
  
  message.guild.channels.cache.forEach(channel => {
      channel.updateOverwrite(message.guild.id, { SEND_MESSAGES: true })
  });

  let embed = new MessageEmbed()
  .setTitle(`Success!`)
  .setFooter(`${client.user.username}`, client.user.avatarURL())
  .setTimestamp()
  .setDescription(`<:blobsuccess:869118676840873994> All channels has been open!`)
  .setColor("00FF00")
  .setFooter(client.user.username)

  message.channel.send(embed)

};

module.exports.help = {
  name: "unlockall",
  aliases: []
};