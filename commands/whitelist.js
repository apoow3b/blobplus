module.exports.run = async (client, message, args) => {

  const db = require("quick.db");
  const { MessageEmbed } = require("discord.js");

  if(message.author === message.guild.owner.user) {

    if(args[0] == "list") {
      var wl = message.guild.members.cache.filter(member => db.get("whitelist_" + message.guild.id + "_" + member.id))
      let list = message.guild.members.cache.filter(u => db.get(`whitelist_${message.guild.id}_${u.id}`)).map(a => `${a.user.username} [${a.user.id}]`).join('\n');
      if(list.length < 1) return message.channel.send(`No whitelist members on this server.`)

      let embed = new MessageEmbed()
      .setTitle(`Whitelist`)
      .setTimestamp()
      .setDescription(`\`\`\`${list}\`\`\``)
      .setFooter(`${client.user.username} - Total: ${wl.size}`, client.user.avatarURL())
      .setColor("fcc21b")

      return message.channel.send(embed)
    } else {
      let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 

      if(!member) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a valid mention or id!`)
      if(db.get("whitelist_" + message.guild.id + "_" + member.id) === true) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, this person is already whitelist!`)

      let embed = new MessageEmbed()
      .setTitle(`Success!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`<:blobsuccess:869118676840873994> ${member} has been added to the whitelist!`)
      .setColor("00FF00")

      db.set("whitelist_" + message.guild.id + "_" + member.id, true)
      return message.channel.send(embed)
    }
  } else {

      return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you don't have the permission to use this command! \`\`\`Permissions: SERVER_OWNER\`\`\``)
  }

};

module.exports.help = {
  name: "whitelist",
  aliases: ["wl"]
};