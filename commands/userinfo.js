

module.exports.run = async (client, message, args) => {

  const db = require("quick.db");
  const Discord = require("discord.js");
  const moment = require("moment")
  const disbut = require("discord-buttons")
  let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
  if(!user) {return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a valid mention or id!`)}
  const button = new disbut.MessageButton()
  .setStyle('url')
  .setURL(user.avatarURL())
  .setLabel("Get Profile Picture 🎫")
  const info = new Discord.MessageEmbed()
  .setColor(`fcc21b`)
  .setTitle(`User Information`)
  .setFooter(`${client.user.username}`, client.user.avatarURL())
  .setTimestamp()
  .setDescription(`\`\`\`Username: ${user.username}\nID: ${user.id}\nJoined At: ${moment.utc(user.joinedAt).format('LLL')}\nCreated At: ${moment.utc(user.createdAt).format('LLL')}\`\`\``)
  .setThumbnail(user.avatarURL({dynamic:true}))
  message.channel.send(info, button)

};

module.exports.help = {
  name: "userinfo",
  aliases: []
};