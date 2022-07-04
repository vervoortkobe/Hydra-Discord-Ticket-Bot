const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    const inviteEmbed = new Discord.MessageEmbed()
    .setColor(0x6666ff)
    .setTitle(`🤖 | Invite`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`You can add ${client.user.username} to your own Discord server [here](http://rexbot.ga/hydrabot-invite)!`)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(inviteEmbed)
    .then(message.react("🤖"));
  }

  module.exports.help = {
    name: "invite"
}