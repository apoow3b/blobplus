const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("../config.json");
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
    
  const msg = client.snipes.get(message.channel.id)
  if(!msg) return message.channel.send("No saved message")

  const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
  .setDescription(msg.content)
  .setTimestamp()
  .setColor('fcc21b')
  if(msg.image)embed.setImage(msg.image)
  
  message.channel.send(embed)  
  }


module.exports.help = {
    name: "snipe",
    aliases: []
}