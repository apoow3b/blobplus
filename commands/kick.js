module.exports.run = async (client, message, args) => {

  const { MessageEmbed } = require("discord.js");
  const db = require("quick.db");
  if(message.member.hasPermission("KICK_MEMBERS")) {
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
  let raison = args.slice(1).join(" ") || "no reason";
  if(!user) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a valid mention or id!`)
  if(message.member.roles.highest.position <= user.roles.highest.position) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you can't kick this user! (hightest role)`)
  if(!user.kickable) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you can't kick this user!`)

  let embed = new MessageEmbed()
  .setTitle(`Success`)
  .setFooter(`${client.user.username}`, client.user.avatarURL())
  .setTimestamp()
  .setDescription(`<:blobsuccess:869118676840873994> ${user} has been kicked!`)
  .addField("Reason:", reason)
  .setColor("00FF00")
  .setFooter(client.user.username)

  user.kick(`[${message.author.tag}] ${raison}`)
  message.channel.send(embed)
  } else {
    return message.channel.send(`<:bloberror:869118676740239411> You don't have the permission to use this command! \`\`\`Permissions: KICK_MEMBERS\`\`\``)
  }
};

module.exports.help = {
  name: "kick",
  aliases: []
};