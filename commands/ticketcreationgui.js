const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${x} | I couldn't send the ticket creation GUI, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    message.delete();
  
    const ticketcreationEmbed = new Discord.MessageEmbed()
    .setColor(0x6666ff)
    .setTitle(`🎫 | Ticket Creation`)
    .addField(`Do you want to create a ticket?`, `Simply **react** with the \`🎫\` reaction on this message!`)
    .setFooter(`${prefix} | ${client.user.username}`)
    .setTimestamp()
    message.channel.send(ticketcreationEmbed)
    .then(m => m.react("🎫"));
  }

  module.exports.help = {
    name: "ticketcreationgui"
}