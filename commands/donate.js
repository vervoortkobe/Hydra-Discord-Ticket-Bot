const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
  
    const donateEmbed = new Discord.MessageEmbed()
    .setColor(0x6666ff)
    .setTitle(`💸 | Donate`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(`You can donate using PayPal [here](https://rexbot.ga/donate)!`)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(donateEmbed)
    .then(message.react("💸"));
  }

  module.exports.help = {
    name: "donate"
}