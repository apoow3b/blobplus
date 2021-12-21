module.exports.run = async (client, message, args) => {

  const db = require("quick.db");
  const { MessageEmbed } = require("discord.js");

  if(message.member.hasPermission("ADMINISTRATOR")) {
    let gchannel = db.fetch(`${message.guild.id}_greatchannel`)
    let greatmsg = db.fetch(`${message.guild.id}_greatmessage`)
    let greattime = db.fetch(`${message.guild.id}_greattime`)

    let channel = db.fetch(`${message.guild.id}_joinchannel`)
    let joinmsg = db.fetch(`${message.guild.id}_joinmessage`)


    var random = Math.floor(Math.random() * 1000) + 1;

    function filtre(msg) {
      return msg
      .replace('{member_mention}', client.user)
      .replace('{server_name}', message.guild.name)
      .replace('{server_count}', random)
      .replace('{member_name}', client.user.username);
  }

    let chnl = channel.id
    let gchnl = gchannel.id

    let awb = db.get("antiwb_" + message.guild.id) === true ? `\`ON\`` : `\`OFF\``
    let al = db.get("antilink_" + message.guild.id) === "on" ? `\`ON\`` : `\`OFF\``
    let as = db.get("antispam_" + message.guild.id) === "on" ? `\`ON\`` : `\`OFF\``

      let embed = new MessageEmbed()
      .setTitle(`Settings`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(`**Anti Webhook:** ${awb}\n**Anti Link:** ${al}\n**Anti Spam:** ${as}`)
      .addField("Join", `・ Channel: <#${chnl}>\n\n・ Message: \`\`\`${joinmsg}\`\`\`\n・ Join Example: \n${filtre(joinmsg)}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`, true)
      .addField("Great", `・ Channel: <#${gchnl}>\n・ Time: \`${greattime}\`\n\n・ Message: \`\`\`${greatmsg}\`\`\`\n・ Great Example: \n${filtre(greatmsg)}`)
      .setColor("fcc21b")

      let embed2 = new MessageEmbed()
      .setTitle(`Settings - Help`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .addField("{member_mention}", `New Member Mention`, true)
      .addField("{member_name}", "New Member Name", true)
      .addField("{server_name}", `Server Name`, true)
      .addField("{server_count}", "Server Member Count", true)
      .setColor("FF0000")

      return message.channel.send(embed) && message.channel.send(embed2)

  } else {

    return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you don't have the permission to use this command! \`\`\`Permissions: ADMINISTRATOR\`\`\``)

  }

};

module.exports.help = {
  name: "settings",
  aliases: ["status", "config"]
};