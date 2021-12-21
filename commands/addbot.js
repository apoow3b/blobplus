const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json")
const disbut = require('discord-buttons');

let button = new disbut.MessageButton()
.setStyle('url')
.setURL(`https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`) 
.setLabel('Add the bot! 🤖'); 

let button2 = new disbut.MessageButton()
.setStyle('url')
.setURL(`https://github.com/apoow3b`) 
.setLabel('Support ✨'); 

let row = new disbut.MessageActionRow()
  .addComponents(button, button2);

module.exports.run = async (client, message, args) => {
    var help = new Discord.MessageEmbed()
    .setTitle(`Add the Bot!`)
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setTimestamp()
    .setDescription("Click on the button you want to add me!")
    .setColor("fcc21b")
    message.channel.send(help, row)
}

module.exports.help = {
    name: "addbot",
    aliases: ["invite"]
}