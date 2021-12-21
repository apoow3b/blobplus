const db = require("quick.db")
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  let embed = db.fetch(`embed_${message.guild.id}`);
  var USER = message.author;
  var REASON = args.slice(0).join("  ");
  const no = new Discord.MessageEmbed()
  .setTitle(`Error!`)
  .setFooter(`${client.user.username}`, client.user.avatarURL())
  .setTimestamp()
    .setColor(`FF0000`)
    .setDescription(`<:bloberror:869118676740239411> Please mention a reason to be AFK!`)
  if (!REASON) return message.channel.send(no);
  db.set(`afk_${USER.id}`, REASON);
  db.set(`afktime_${USER.id}`, Date.now());
  const afk = new Discord.MessageEmbed()
  .setTitle(`AFK!`)
  .setFooter(`${client.user.username}`, client.user.avatarURL())
  .setTimestamp()
    .setColor(`fcc21b`)
    .setDescription(`You are now AFK!`)
  message.channel.send(afk);
  
};

module.exports.help = {
  name: "afk",
  aliases: []
};