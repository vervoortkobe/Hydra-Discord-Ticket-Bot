const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let ticketrole = message.guild.roles.cache.find(r => r.name === "Ticket Support");
    if(message.member.roles.cache.has(ticketrole.id)) {
      
      if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`${x} | You can't use that command outside of a ticket channel!`);
      
      if(!args[0]) {
        const renameUsageEmbed = new Discord.MessageEmbed()
        .setColor(0x6666ff)
        .setTitle(`⚙️ | Rename`)
        .setDescription(`Usage: **${prefix}rename <new-ticket-name>**`)
        .setFooter(`${prefix} | ${client.user.username}`)
        .setTimestamp()
        return message.channel.send(renameUsageEmbed);
      }
      
      message.channel.setName(`ticket-${args[0]}`);
  
      message.channel.send(`${v} | ${message.author}, I have renamed this ticket to **#ticket-${args[0]}**!`);
  
      const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
      if(!logChannel) return;
    
      const ticketLogEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Logs`)
      .addField(`TICKET_RENAME`, `**${message.author.tag} renamed a ticket to #ticket-${args[0]}**!`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      logChannel.send(ticketLogEmbed);
      
    } else {
      
      return message.channel.send(`${x} | I couldn't rename this ticket, because you do not have the correct role (Ticket Support) to do this!`);
      
    }
  }

  module.exports.help = {
    name: "rename"
}