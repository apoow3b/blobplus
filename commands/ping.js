const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json")
const disbut = require('discord-buttons');


let button2 = new disbut.MessageButton()
.setStyle('url')
.setURL(`https://thislinkisinvalid.com/welcomeplus`) 
.setLabel('Boost the bot! 🚀 (in development)')
.setDisabled();

module.exports.run = async (client, message, args) => {
    var ping = new Discord.MessageEmbed()
    .setTitle(`Pong!`)
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setTimestamp()
    .setDescription(`:ping_pong: Hi! This is my ping:\n\`\`\`Me: ${Date.now() - message.createdTimestamp}ms\nAPI: ${Math.round(client.ws.ping)}\`\`\``)

    .setColor("fcc21b")
    message.channel.send(ping, button2)
}

module.exports.help = {
    name: "ping",
    aliases: []
}