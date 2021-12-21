module.exports.run = async (client, message, args) => {

  const db = require("quick.db");
  const { MessageEmbed } = require("discord.js");

  if(message.author === message.guild.owner.user) {

      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 

      if(!member) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a valid mention or id!`)
      if(db.get("whitelist_" + message.guild.id + "_" + member.id) === false) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, this person is not whitelist!`)

      let embed = new MessageEmbed()
      .setTitle(`Success!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`<:blobsuccess:869118676840873994> ${member} has been removed to the whitelist!`)
      .setColor("00FF00")
      .setFooter(client.user.username)

      db.delete("whitelist_" + message.guild.id + "_" + member.id)
      return message.channel.send(embed)

  } else {

    return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you don't have the permission to use this command! \`\`\`Permissions: SERVER_OWNER\`\`\``)

  }

};

module.exports.help = {
  name: "unwhitelist",
  aliases: ["unwl"]
};