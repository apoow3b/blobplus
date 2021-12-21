const { default: discordButtons } = require("discord-buttons");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const db = require("quick.db")

module.exports.run = async (client, message, args) => {

  if (!db.has("whitelist_" + message.guild.id + "_" + message.author.id) && message.author.id !== message.guild.ownerID) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you don't have the permission to use this command!\`\`\`Permissions: SERVER_WHITELIST\`\`\``);  


  if(args[0] == 'set') {
    let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) 
    if(!role) {
      var help = new Discord.MessageEmbed()
      .setTitle(`Error!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}autorole <set/off> [@role/role_id]\`\`\``)
      .setColor("#FF0000")
      return message.channel.send(help)
    }
      db.set(`${message.guild.id}_autorole`, role)
      message.channel.send(`<:wplus_yeah:868805278911578123> **Auto Role** updated to ${role}`)
  } else if(args[0] == 'off') {
      db.delete(`${message.guild.id}_autorole`)
      message.channel.send(`<:wplus_yeah:868805278911578123> **Auto Role** has been disabled`)
  } else {
    var help = new Discord.MessageEmbed()
    .setTitle(`Error!`)
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setTimestamp()
    .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}autorole <set/off> [@role/role_id]\`\`\``)
    .setColor("#FF0000")
    return message.channel.send(help)
  }
  }


module.exports.help = {
    name: "autorole",
    aliases: []
}