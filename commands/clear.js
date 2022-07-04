const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${x} | I couldn't purge those messages, because you do not have the correct permissions (MANAGE_MESSAGES) to do this!`);

    if (!args[0]) return message.channel.send(`${x} | Please define the number of messages to purge!`);

    if(Number.isInteger(parseInt(args[0]))) {
      if(parseInt(args[0]) < 100) {

        var amount = parseInt(args[0]) + 1;

        message.channel.bulkDelete(amount);

        message.channel.send(`${v} | **${message.author} purged** \`${amount - 1}\` **messages**!`).then(m => m.delete({ timeout: 3000 }));

      } else {
        return message.channel.send(`${x} | You can't purge more than \`99\` messages!`);
      }
    } else {
      return message.channel.send(`${x} | Please define the amount of messages to purge!`);
    }
  }

  module.exports.help = {
    name: "clear"
}