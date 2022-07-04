const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${x} | I couldn't say that, because you do not have the correct permissions (MANAGE_MESSAGES) to do this!`);

    const sayMessage = args.join(" ");

    if(!sayMessage) {
      const sayUsageEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Say`)
      .setDescription(`Usage: **${prefix}say <message>**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(sayUsageEmbed);
    }

    message.delete(); 
    message.channel.send(sayMessage);
  }

  module.exports.help = {
    name: "say"
}