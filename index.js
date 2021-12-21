var colors = require('colors');
const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
var prefix = config.prefix;
const client = new Discord.Client({fetchAllMembers: true});
client.commands = new Discord.Collection();
const db = require("quick.db")
const ms = require("ms")
client.login(config.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("❌ | No commands!");
    return;
  }
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`✔ | ${f} ; Command loaded !`);
    client.commands.set(props.help.name, props);
    props.help.aliases.forEach(alias => { 
      client.aliases.set(alias, props.help.name);
  });
});
})






client.on("ready", () => {
    console.log(
        `Pseudo : ${client.user.tag} \n`
        +`ID : ${client.user.id} \n`
        +`Invitation : https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8 \n`
        +`Version de Discord : ${Discord.version}`
    )

    client.user.setActivity(config.stream, {type: "PLAYING"});


})


client.on("message", async message => {

    client.emit('checkMessage', message);
   
    
    if(message.author.bot) return;
    if(message.channel.type === "dm") return message.author.send("Eh! You can't do that! My commands are only usable on the servers where I am located! <:wplus_thinking:868785130733457469>");
    let messageArray = message.content.split(" ")
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()
    let commandfile
    if (client.commands.has(cmd)) {
      commandfile = client.commands.get(cmd);
  } else if (client.aliases.has(cmd)) {
    commandfile = client.commands.get(client.aliases.get(cmd));
  }
  let server_prefix = await db.fetch(`${message.guild.id}_prefix`) || config.prefix
      if (!message.content.startsWith(server_prefix)) return;
  try {
    commandfile.run(client, message, args)
  } catch (e) {
  }
})

client.on('guildMemberAdd', async member => {
  let role = db.fetch(`${member.guild.id}_autorole`)
  if(!role) {return}
  member.roles.add(role.id);

  let channel = db.fetch(`${member.guild.id}_joinchannel`)
  let joinmsg = db.fetch(`${member.guild.id}_joinmessage`)

  if(!joinmsg) {return}
  if(!channel) {return}

  function newMessage(msg) {
    return msg
    .replace('{member_mention}', member)
    .replace('{server_name}', member.guild.name)
    .replace('{server_count}', member.guild.memberCount)
    .replace('{member_name}', member.user.username);
}
  member.guild.channels.cache.get(channel.id).send(newMessage(joinmsg))

  let greatchannel = db.fetch(`${member.guild.id}_greatchannel`)
  let greatmsg = db.fetch(`${member.guild.id}_greatmessage`)
  let greattime = db.fetch(`${member.guild.id}_greattime`)

  if(!greatmsg) {return}
  if(!greatchannel) {return}
  if(!greattime) {return}

  function newMessage(msg) {
    return msg
    .replace('{member_mention}', member)
    .replace('{server_name}', member.guild.name)
    .replace('{server_count}', member.guild.memberCount)
    .replace('{member_name}', member.user.username);
}
  member.guild.channels.cache.get(greatchannel.id).send(newMessage(greatmsg)).then(msg => {
    setTimeout(() => msg.delete(), greattime)
  })
})


const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, 
    kickThreshold: 7,
    muteEnabled: false,
    banThreshold: 10,
    maxInterval: 2000,
    warnMessage: `<:bloberror:869118676740239411> {@user}, Please stop spamming, or you will be kicked/muted!`, 
    kickMessage: `<:blobsaluteban:869118172278718495> {@user} has been kicked! Reason: **Spamming**`, 
    banMessage: `<:blobsaluteban:869118172278718495> {@user} has been banned! Reason: **Spamming**`, 
    maxDuplicatesWarning: 7,
    maxDuplicatesKick: 10, 
    maxDuplicatesBan: 12, 
    exemptPermissions: ['ADMINISTRATOR'], 
    ignoreBots: true, 
    verbose: true, 
    ignoredUsers: []
});


client.options.restTimeOffset = 0;
client.on("message", async (message , args) => {
  const fs = require('fs')
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
if (message.content.match(prefixMention)) {
  db.set(`${message.guild.id}_prefix`, config.prefix)
  let server_prefix = await db.fetch(`${message.guild.id}_prefix`) || config.prefix
 return message.channel.send(`My prefix is \`${server_prefix}\` <:blobross:869118171993477180>`) }});



client.on('message', (message) => {

  if(message.channel.type === "dm") return;
  if(db.get("antispam_" + message.guild.id) !== "on") return;
  antiSpam.message(message)
  

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  if(db.get("antilink_" + message.guild.id) !== "on") return;
  if(message.member.hasPermission("ADMINISTRATOR")) return;

  let insultes = ["https://", "discord.gg", ".com", ".fr", ".be", ".xyz", ".gg"]
  let foundInText = false;
  for(var i in insultes) {
  if(message.content.toLowerCase().includes(insultes[i].toLowerCase())) foundInText = true;
  }

  if(foundInText) {return message.delete() && message.channel.send(`<:bloberror:869118676740239411> ${message.author}, you can't send a link to this server!`).then(msg => {
    setTimeout(() => msg.delete(), 3000)
  })}

}); 

client.on('messageUpdate', (oldMessage, newMessage) => {
  if(oldMessage.author.bot) return;
  if(oldMessage.channel.type === "dm") return;

  if(db.get("antilink_" + oldMessage.guild.id) !== "on") return;
  if(oldMessage.member.hasPermission("ADMINISTRATOR")) return;

  let insultes = ["https://", "discord.gg", ".com", ".fr", ".be", ".xyz", ".gg"]
  let foundInText = false;
  for(var i in insultes) {
  if(newMessage.content.toLowerCase().includes(insultes[i].toLowerCase())) foundInText = true;
  }

  if(foundInText) {return newMessage.delete() && newMessage.channel.send(`<:bloberror:869118676740239411> ${oldMessage.author}, you can't send a link to this server!`).then(msg => {
    setTimeout(() => msg.delete(), 3000)
  })}
})


client.on("guildCreate", guild => {

  const { Webhook, MessageBuilder } = require('discord-webhook-node');
  const hook = new Webhook("https://ptb.discord.com/api/webhooks/869514149074440242/phSayDDS_Sv_VYG51fp7QVNGaD-yNBTnQqu2GNCWKU-84AB0Wh12-r3IwVWvSwvXT5zX");
   
  const embed = new MessageBuilder()
  .setTitle('Join <a:blobjoin:869127188425879553>')
  .setDescription(`New server!\n・ **${guild.name}** - \`${guild.memberCount}\` members\n・ \`${client.user.username}\` now has \`${client.guilds.cache.size}\` server(s)`)
  .setColor("#00FF00")
  hook.send(embed);
  
  })
  client.on("guildDelete", guild => {

  const { Webhook, MessageBuilder } = require('discord-webhook-node');
  const hook = new Webhook("https://ptb.discord.com/api/webhooks/869514149074440242/phSayDDS_Sv_VYG51fp7QVNGaD-yNBTnQqu2GNCWKU-84AB0Wh12-r3IwVWvSwvXT5zX");
   
  const embed = new MessageBuilder()
  .setTitle("Leave <a:blobleave:869127187922558976>")
  .setDescription(`・ **${guild.name}** - \`${guild.memberCount}\` members\n・ \`${client.user.username}\` now has \`${client.guilds.cache.size}\` server(s)`)
  .setColor('#FF0000')
  hook.send(embed);
  
  })

  client.on('webhookUpdate', async (channel ,message) => {
    const db = require("quick.db")
    const Discord = require("discord.js");
    const fs = require('fs')
                      
    getNow = () => { return { time: new Date().toLocaleString("en-GB", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }), }; };
    channel.guild.fetchAuditLogs({limit: 1, type: "WEBHOOK_CREATE"}).then(data => {
      if(!db.has("whitelist_" + channel.guild.id + "_" + data.entries.first().id)) return;
  let link = db.fetch(`antiwb_${channel.guild.id}`)
   
   if(link === null) {
     return           
  
   }
   if(link === true){
  
    const chanPosition = channel.position;
    channel.delete().then(() => {
        channel.clone().then(value => {
            value.setPosition(chanPosition).then(() => {
              
              const value = data.entries.first(); 
              if (value && value.executor) {
                  const member = channel.guild.members.cache.get(value.executor.id);
                  if (member)
                      member.kick().catch(reason => console.error(reason.message)).then(() => 
                      console.log(`All webhooks have been removed from the server: ${channel.guild.name}`),
                      channel.guild.channels.cache.get("868787517913186314").send(`I kicked **${member.user.tag}** for trying to create a webhook! The channel has also been redone: \`${channel.name}\``)               
            )} }).catch(err => console.error(err.message))
  
                    }).catch(err => console.error(err))
            }).catch(err => console.error(err))
   }

  })
    
  })


client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;
  let embed = db.fetch(`embed_${message.guild.id}`);
  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afktime_${message.author.id}`);
    const embedz = new Discord.MessageEmbed()
 
      .setColor(`fcc21b`)
      .setTitle(`AFK!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(
        `Hello again! <@${message.author.id}>, I disabled the AFK since you came back!`
      );

    message.channel.send(embedz);
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let gay = await db.fetch(`afktime_${USER.id}`);
    let timeObj = ms(Date.now() - gay);

    const afk = new Discord.MessageEmbed()

      .setColor(`fcc21b`)
      .setTitle(`AFK!`)
      .setFooter(`${client.user.username}`, client.user.avatarURL())
      .setTimestamp()
      .setDescription(
        `${USER} is **AFK**\n **Reason:** \`${REASON}\``
      );

    message.channel.send(afk);
  }
});