module.exports.run = async (client, message, args) => {
  const { MessageEmbed } = require("discord.js");

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:bloberror:869118676740239411> You don't have the permission to use this command! \`\`\`Permissions: MANAGE_MESSAGES\`\`\``)
  if(!args[0]) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a number between \`1\` & \`100\``)
  if(isNaN(args[0])) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a number between \`1\` & \`100\``)
  if(args[0] < 1) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a number between \`1\` & \`100\``)
  if(args[0] > 100) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a number between \`1\` & \`100\``)

  let embed = new MessageEmbed()
  .setTitle(`Success!`)
  .setFooter(`${client.user.username}`, client.user.avatarURL())
  .setTimestamp()
  .setDescription(`<:blobsuccess:869118676840873994> \`${args[0]}\` messages has been deleted!`)
  .setColor("00FF00")
  .setFooter(client.user.username)

  message.delete()
  message.channel.bulkDelete(args[0])
  let msg = await message.channel.send(embed)

  function del(){
      msg.delete()
  }
  setTimeout(del, 2500)

};

module.exports.help = {
  name: "clear",
  aliases: ["purge"]
};