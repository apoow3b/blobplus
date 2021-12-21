const Discord = require('discord.js')
fs = require("fs");

module.exports.run = async(client, message, args) => {

var connectedCount = 0;
        var streamingCount = 0;
        var mutedCount = 0;
        var mutedMic = 0;
        var cameraCount =0;
        const channels = message.guild.channels.cache.filter(c => c.type === 'voice');
        channels.forEach(c => {
            connectedCount += c.members.size;
            c.members.forEach(m => {
                if(m.voice.streaming) streamingCount++;
                if(m.voice.selfDeaf || m.voice.serverDeaf) mutedCount++;            
                if(m.voice.selfMute || m.voice.serverMute) mutedMic++;
                if(m.voice.selfVideo) cameraCount++;
            })
        })
        const voiceConnectedEmbed = new Discord.MessageEmbed()  
        .setTitle(`Voice Count`)
        .setFooter(`${client.user.username}`, client.user.avatarURL())
        .setTimestamp()
            .setDescription(`**${connectedCount}** people in voice on **${message.guild.memberCount}** people on the server!\`\`\`Advanced:\n\n・ Stream: ${streamingCount}\n・ Micro Mute: ${mutedMic}\n・ Headphone Mute: ${mutedCount}\n・ Camera: ${cameraCount}\`\`\``)
            .setColor("fcc21b")
        message.channel.send(voiceConnectedEmbed);
    }

module.exports.help = {
    name: "vc",
    aliases: ["voicecount"]
}