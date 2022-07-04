const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
  
    const websiteEmbed = new Discord.MessageEmbed()
    .setColor(0x6666ff)
    .setTitle(`🤖 | Website`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`Visit [rexbot.ga](https://rexbot.ga)`)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(websiteEmbed)
    .then(message.react("🤖"));
  }

  module.exports.help = {
    name: "website"
}