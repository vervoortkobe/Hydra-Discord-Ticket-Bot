const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    const botstatsEmbed = new Discord.MessageEmbed()
    .setColor(0x6666ff)
    .setTitle(`🤖 | Botstats`)
    .setThumbnail(client.user.displayAvatarURL())
    .addField(`Servers`, `Serving \`${client.guilds.cache.size}\` servers!`, true)
    .addField(`Cached Users`, `Serving \`${client.users.cache.size}\` users!`, true)
    .setFooter(`${prefix} | ${client.user.username}`) 
    .setTimestamp()
    message.channel.send(botstatsEmbed)
    .then(message.react("🤖"));
  }

  module.exports.help = {
    name: "botstats"
}