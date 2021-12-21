const { default: discordButtons } = require("discord-buttons");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if (!db.has("whitelist_" + message.guild.id + "_" + message.author.id) && message.author.id !== message.guild.ownerID) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you don't have the permission to use this command!\`\`\`Permissions: SERVER_WHITELIST\`\`\``);  

    if(args[0] == 'settings') {
      let embed2 = new Discord.MessageEmbed()
      .setTitle(`Great - Settings`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .addField("{member_mention}", `New Member Mention`, true)
      .addField("{member_name}", "New Member Name", true)
      .addField("{server_name}", `Server Name`, true)
      .addField("{server_count}", "Server Member Count", true)
      .setColor("FF0000")
      return message.channel.send(embed2)
    } else 

  if(args[0] == 'time') {
    if(isNaN(args[1])) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a number between \`1\` & \`10000\``)
    if(args[1] < 1) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a number between \`1\` & \`10000\``)
    if(args[1] > 10000) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a number between \`1\` & \`10000\``)
  
    if (!args[1]) {
      var help = new Discord.MessageEmbed()
      .setTitle(`Error!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}great <message/channel/time> [message/#channel/channel_id/time]\`\`\`\n\n:warning: **Time in milliseconds** (ex: 1000 = 1s | 10000 = 10s)`)
      .setColor("#FF0000")
      return message.channel.send(help)
    } else
    db.set(`${message.guild.id}_greattime`, args[1])
    message.channel.send(`<:blobsuccess:869118676840873994> **Great Time** updated to \`${args[1]}\` milliseconds`)
  } else
  if(args[0] == 'channel') {
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(!channel) {
      var help = new Discord.MessageEmbed()
      .setTitle(`Error!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}great <message/channel/time> [message/#channel/channel_id/time]\`\`\``)
      .setColor("#FF0000")
      return message.channel.send(help)
    }
      db.set(`${message.guild.id}_greatchannel`, channel)
      message.channel.send(`<:blobsuccess:869118676840873994> **Great Channel** updated to ${channel}`)
    } else if(args[0] == 'message') {
      let greatmsg = args.slice(1).join(" ")
      if (!greatmsg) {
        var help = new Discord.MessageEmbed()
        .setTitle(`Error!`)
        .setFooter(`${client.user.username}`, client.user.avatarURL())
        .setTimestamp()
        .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}great <message/channel/time> [message/#channel/channel_id/time]\`\`\``)
        .setColor("#FF0000")
        return message.channel.send(help)
      } else {
        db.set(`${message.guild.id}_greatmessage`, greatmsg)

        function newMessage(msg) {
        return msg
        .replace('{member_mention}', client.user)
        .replace('{server_name}', message.guild.name)
        .replace('{server_count}', message.guild.memberCount)
        .replace('{member_name}', client.user.username);
    }
        var help = new Discord.MessageEmbed()
        .setTitle(`Success!`)
        .setFooter(`${client.user.username}`, client.user.avatarURL())
        .setTimestamp()
        .setDescription(`<:blobsuccess:869118676840873994> New great message updated by ${message.author}!`)
        .addField("New Message:", `${greatmsg}`)
        .addField("Result:", newMessage(greatmsg))      
        .setColor("#00FF00")
        message.channel.send(help)
      }
    } else {
      var help = new Discord.MessageEmbed()
      .setTitle(`Error!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}great <message/channel/time> [message/#channel/channel_id/time]\`\`\``)
      .setColor("#FF0000")
      message.channel.send(help)
    } 
  }


module.exports.help = {
    name: "great",
    aliases: ["setgreat"]
}