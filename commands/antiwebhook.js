const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if(!message.guild.members.cache.get(client.user.id).hasPermission("MANAGE_WEBHOOKS")) return message.channel.send(`<:bloberror:869118676740239411> I don't have the permissions \`\`\`Permissions: MANAGE_WEBHOOKS, KICK_MEMBERS, MANAGE_CHANNELS\`\`\``)
  if (!db.has("whitelist_" + message.guild.id + "_" + message.author.id) && message.author.id !== message.guild.ownerID) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you don't have the permission to use this command!\`\`\`Permissions: SERVER_WHITELIST\`\`\``);  
  if(args[0] == 'on') {

    if(db.get("antiwb_" + message.guild.id) === true) return message.channel.send(`<:bloberror:869118676740239411> **Anti Webhook** is already activated.`)
  
    let embed = new Discord.MessageEmbed()
    .setTitle(`Success!`)
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setTimestamp()
    .setDescription(`<:blobsuccess:869118676840873994> **Anti Webhook** has been activated!`)
    .setColor("00FF00")
  
    db.set("antiwb_" + message.guild.id, true)
    return message.channel.send(embed)
    } else if(args[0] == 'off') {

        if(db.get("antiwb_" + message.guild.id) === null) return message.channel.send(`<:bloberror:869118676740239411> **Anti Webhook** is already deactivated.`)
      
        let embed = new Discord.MessageEmbed()
        .setTitle(`Success!`)
        .setFooter(`${client.user.username}`, client.user.avatarURL())
        .setTimestamp()
        .setDescription(`<:blobsuccess:869118676840873994> **Anti Webhook** has been disabled!`)
        .setColor("00FF00")
      
        db.set("antiwb_" + message.guild.id, null)
        return message.channel.send(embed)
    } else {
      var help = new Discord.MessageEmbed()
      .setTitle(`Error!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}antiwebhook <on/off>\`\`\``)
      .setColor("#FF0000")
      message.channel.send(help)
    }
}

module.exports.help = {
    name: "antiwebhook",
    aliases: []
}