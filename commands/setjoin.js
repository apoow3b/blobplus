const { default: discordButtons } = require("discord-buttons");
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
  if (!db.has("whitelist_" + message.guild.id + "_" + message.author.id) && message.author.id !== message.guild.ownerID) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you don't have the permission to use this command!\`\`\`Permissions: SERVER_WHITELIST\`\`\``);  


    if(args[0] == 'settings') {
      let embed2 = new Discord.MessageEmbed()
      .setTitle(`Join - Settings`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .addField("{member_mention}", `New Member Mention`, true)
      .addField("{member_name}", "New Member Name", true)
      .addField("{server_name}", `Server Name`, true)
      .addField("{server_count}", "Server Member Count", true)
      .setColor("FF0000")
      return message.channel.send(embed2)
    } else 
  if(args[0] == 'channel') {
    let channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
    if(!channel) {
      var help = new Discord.MessageEmbed()
      .setTitle(`Error!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}join <message/channel> [message/#channel/channel_id]\`\`\``)
      .setColor("#FF0000")
      return message.channel.send(help)
    }
      db.set(`${message.guild.id}_joinchannel`, channel)
      message.channel.send(`<:wplus_yeah:868805278911578123> **Join Channel** updated to ${channel}`)
    } else if(args[0] == 'message') {
      let joinmsg = args.slice(1).join(" ")
      if (!joinmsg == null) {
        var help = new Discord.MessageEmbed()
        .setTitle(`Error!`)
        .setFooter(`${client.user.username}`, client.user.avatarURL())
        .setTimestamp()
        .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}join <message/channel> [message/#channel/channel_id]\`\`\``)
        .setColor("#FF0000")
        return message.channel.send(help)
      } else {
        db.set(`${message.guild.id}_joinmessage`, joinmsg)

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
        .setDescription(`<:blobsuccess:869118676840873994> New join message updated by ${message.author}!`)
        .addField("New Message:", `${joinmsg}`)
        .addField("Result:", newMessage(joinmsg))      
        .setColor("#00FF00")
        message.channel.send(help)
      }
    } else {
      var help = new Discord.MessageEmbed()
      .setTitle(`Error!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}join <message/channel> [message/#channel/channel_id]\`\`\``)
      .setColor("#FF0000")
      message.channel.send(help)
    }
  }


module.exports.help = {
    name: "join",
    aliases: ["setjoin"]
}