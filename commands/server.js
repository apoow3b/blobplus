const db = require("quick.db")
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
    const ids = ["608792025784909825"]
    if(!ids.includes(message.author.id)) return;
    if (args[0] == 'list') {
  let i0 = 0;
  let i1 = 10;
  let page = 1;
  const server = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r).map((r, i) => `${r.name} - [${r.memberCount} members | ${r.id}]`).slice(i0, i1).join("\n");

  let description = `Total: ${client.guilds.cache.size}\`\`\`${server}\`\`\``

  const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.avatarURL({dynamic: true}))
      .setColor("fcc21b")
      .setTimestamp()
      .setFooter(`Page: ${page}/${Math.round(client.guilds.cache.size/10)}`)
  .setDescription(description);
  const msg = await message.channel.send(embed);
  await msg.react("⬅");
  await msg.react("➡");
  await msg.react("❌");
  const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
  collector.on("collect", async(reaction) => {
      if (reaction._emoji.name === "⬅") {
          i0 = i0 - 10;
          i1 = i1 - 10;
          page = page - 1;
  
          if (i0 < 0) {
              return msg.channel.send("This page not exist, retry!").then(msg => {
                setTimeout(() => msg.delete(), 5000)
              }) && msg.delete()
          }
  
          const server = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r).map((r, i) => `${r.name} - [${r.memberCount} members | ${r.id}]`).slice(i0, i1).join("\n");

          description = `Total: ${client.guilds.cache.size}\`\`\`${server}\`\`\``
  

          embed.setTitle(`${client.user.username} Servers`).setFooter(`Page: ${page}/${Math.round(client.guilds.cache.size/10)}`)
              .setDescription(description);
          msg.edit(embed);
      }
      if (reaction._emoji.name === "➡") {
          i0 = i0 + 10;
          i1 = i1 + 10;
          page = page + 1;


          if (i1 > client.guilds.cache.size + 10) {
              return msg.channel.send("There is no other page!").then(msg => {
                setTimeout(() => msg.delete(), 5000)
              })
          }

          const server = client.guilds.cache.sort((a, b) => b.memberCount - a.memberCount).map((r) => r).map((r, i) => `${r.name} - [${r.memberCount} members | ${r.id}]`).slice(i0, i1).join("\n");

          description = `Total: ${client.guilds.cache.size}\`\`\`${server}\`\`\``


          embed.setTitle(`${client.user.username} Servers`).setFooter(`Page: ${page}/${Math.round(client.guilds.cache.size/10)}`)
              .setDescription(description);


          msg.edit(embed);
      }
      if (reaction._emoji.name === "❌") {
          return msg.delete();
      }
      await reaction.users.remove(message.author.id);
  });  
} else if(args[0] == 'leave') {

    const guildID = args[1];
    if(isNaN(guildID) || !guildID || guildID.length != 18) {
        return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a valid guild id!`);
    } else {
        const guild = client.guilds.cache.get(guildID);
        if(guild === undefined) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, I can't find any server with this id`);
        if(!guild.available) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, server not available, try again later`);

        client.guilds.cache.get(guildID).leave()
        .then(x => {
            console.log(`${message.author} made me leave : ${x.name}`);
            message.channel.send(`<:blobsuccess:869118676840873994> I left \`${x.name}\``).catch(() => {});
        })
        .catch(err => {
            message.channel.send(`\`\`\`js\n${err}\n\`\`\``);
        })
    }
} else {
    const config = require("../config.json")
    var help = new Discord.MessageEmbed()
    .setTitle(`Error!`)
    .setFooter(`${client.user.username}`, client.user.avatarURL())
    .setTimestamp()
    .setDescription(`<:bloberror:869118676740239411> Usage: \`\`\`${config.prefix}server <list/leave> [server_id]\`\`\``)
    .setColor("#FF0000")
    return message.channel.send(help)
}
};

module.exports.help = {
  name: "server",
  aliases: []
};