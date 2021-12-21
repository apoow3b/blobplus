const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const disbut = require('discord-buttons');

module.exports.run = async (client, message, args) => {
  let button = new disbut.MessageButton()
.setStyle('url')
.setURL(`${message.guild.iconURL()}`) 
.setLabel('Get Server Icon 🎫');

    const boosts = message.guild.premiumSubscriptionCount
    const boostlevel = message.guild.premiumTier
    var help = new Discord.MessageEmbed()
    .setTitle(`Server Information`)
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setTimestamp()
    .setThumbnail(message.guild.iconURL())
    .setImage(message.guild.bannerURL())
    .setDescription(`\`\`\`Server Name: ${message.guild.name}\nRegion: ${message.guild.region}\nID: ${message.guild.id}\nOwner: ${message.guild.owner.user.username}\nMembers: ${message.guild.members.cache.filter(member => !member.user.bot).size}\nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}\nChannels: ${message.guild.channels.cache.size}\nRoles: ${message.guild.roles.cache.size}\nEmojis: ${message.guild.emojis.cache.size}\nBoosts: ${boosts} (Level ${boostlevel})\n\`\`\``)
    .setColor("fcc21b")
    message.channel.send(help, button)
}

module.exports.help = {
    name: "serverinfo",
    aliases: []
}