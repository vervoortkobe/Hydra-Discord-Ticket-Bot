const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
  
    const supportEmbed = new Discord.MessageEmbed()
    .setColor(0x6666ff)
    .setTitle(`🤖 | Support Server`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`You can join the official ${client.user.username} Discord Support Server [here](https://rexbot.ga/discord)!`)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(supportEmbed)
    .then(message.react("🤖"));
  }

  module.exports.help = {
    name: "support"
}