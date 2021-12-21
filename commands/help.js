const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json")
const disbut = require('discord-buttons');
disbut(client);

let button = new disbut.MessageButton()
.setStyle('url')
.setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`) 
.setLabel('Add the bot! 🤖'); 

module.exports.run = async (client, message, args) => {
    var help = new Discord.MessageEmbed()
    .setTitle(`Commands List`)
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setTimestamp()
    .addField("<:blobowner:869483942082908200> ➔ Owner", "```join, settings, setmessage, great, antiwebhook, antilink, antispam, autorole, whitelist, unwhitelist, adminlist```")
    .addField("<:blobmoderator:869482564312793149> ➔ Moderator", "```ban, kick, mute, unmute, unban, clear, nuke, lock, unlock, lockall, unlockall```")
    .addField("<:blobinfos:869483667888685057> ➔ Everyone", "```help, afk, ping, userinfo, serverinfo, botinfo, addbot, snipe```")

    .setColor("fcc21b")
    message.channel.send(help, button)
    if(message.author === message.guild.owner.user) {
    var devnote = new Discord.MessageEmbed()
    .setTitle(`<a:blobwarn:869483667792212038> Warn`)
    .setDescription("Hi to you, I come to warn you that if you add the bot or if here it is your server, try to give me the maximum of permission otherwise I the bot will not be able to be used at most!\n\nSincerely, The Developers")
    .setColor("#FF0000")
    message.channel.send(devnote)
    }
}

module.exports.help = {
    name: "help",
    aliases: []
}