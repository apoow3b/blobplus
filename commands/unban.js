const { MessageEmbed } = require('discord.js');
fs = require('ms');
module.exports.run = async (client, message, args) => {
    if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(`<:bloberror:869118676740239411> You don't have the permission to use this command! \`\`\`Permissions: BAN_MEMBERS\`\`\``)

        if (!args[0]) return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a valid id!`)

        let member;

        try {
            member = await client.users.fetch(args[0])
        } catch (e) {
            console.log(e)
            return message.channel.send(`<:bloberror:869118676740239411> ${message.author}, please insert a valid mention or id!`)
        }

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag} | ${message.author.id}`, message.author.displayAvatarURL({ dynamic: true }));

        message.guild.fetchBans().then( bans => {

            const user = bans.find(ban => ban.user.id === member.id );

            if (user) {

                embed.setTitle(`Unbanned!`)
                .setFooter(`${client.user.username}`, client.user.avatarURL())
                .setTimestamp()
                .setDescription(`<:blobsuccess:869118676840873994> ${member} has been unbanned!`)
                .setColor("00FF00")
                message.guild.members.unban(user.user.id).then(() => message.channel.send(embed))
            } else {
                embed.setTitle(`Error!`)
                .setFooter(`${client.user.username}`, client.user.avatarURL())
                .setTimestamp()
                .setDescription(`<:bloberror:869118676740239411> ${member} is not in the banlist!`)
                    .setColor("#FF0000")
                message.channel.send(embed)
            }

        }).catch(e => {
            console.log(e)
        });

    }

module.exports.help = {
    name: 'unban',
    aliases: []
};