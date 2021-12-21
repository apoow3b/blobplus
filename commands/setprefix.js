const { default: discordButtons } = require("discord-buttons");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const db = require("quick.db");
const d = require("d");

module.exports.run = async (client, message, args) => {
  if (!db.has("whitelist_" + message.guild.id + "_" + message.author.id) && message.author.id !== message.guild.ownerID) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you don't have the permission to use this command!\`\`\`Permissions: SERVER_WHITELIST\`\`\``);  

  if(args[0] == 'reset') {
  db.set(`${message.guild.id}_prefix`, config.prefix)
  message.channel.send(`<:wplus_yeah:868805278911578123> **Prefix** reseted to \`${config.prefix}\``)

  } 
  if(args[0] == 'set') {
    let new_prfx = args[1]
    message.channel.send(new_prfx)
    if(db.get(`${message.guild.id}_prefix`) === new_prfx) return message.channel.send(`<:bloberror:869118676740239411> This prefix is already the prefix of this server!`)
  if(!new_prfx) {
    return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a valid new prefix!`)
  }
  if(new_prfx < 5) {
    return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, the new prefix must not exceed 5 characters!`)
  }
  db.set(`${message.guild.id}_prefix`, new_prfx) 
  message.channel.send(`<:wplus_yeah:868805278911578123> **Prefix** updated to ${new_prfx}`)
  } else {
    let server_prefix = await db.fetch(`${message.guild.id}_prefix`) || config.prefix
    var help = new Discord.MessageEmbed()
    .setTitle(`Error!`)
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setTimestamp()
    .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${server_prefix}prefix <set/reset> [new_prefix]\`\`\``)
    .setColor("#FF0000")
    message.channel.send(help)
  }
}



module.exports.help = {
    name: "prefix",
    aliases: []
}