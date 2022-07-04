const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    if(!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`${x} | You can't use that command outside of a ticket channel!`);

    if(!args[0]) {
      const removeUsageEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Remove`)
      .setDescription(`Usage: **${prefix}remove <@member/member ID>**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      return message.channel.send(removeUsageEmbed);
    }
    
    let member = message.mentions.users.first();

    if(member) {

      if(member.id === message.author.id) return message.channel.send(`${x} | You can't remove yourself from this ticket!`);
      
      message.channel.updateOverwrite(member, {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
        READ_MESSAGE_HISTORY: false,
        ATTACH_FILES: false
      });

      message.delete();

      message.channel.send(`${v} | ${message.author}, I have **removed ${member} from this ticket** (${message.channel})!`)
      
      const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
      if(!logChannel) return;
        
      const ticketLogEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Logs`)
      .addField(`TICKET_MEMBER_REMOVE`, `${message.author} **removed ${member} from ticket ${message.channel}**!`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      logChannel.send(ticketLogEmbed);

    } else {

      message.guild.members.fetch(args[0])
      .then(member => {

        if(!member) {
          const removeUsageEmbed = new Discord.MessageEmbed()
          .setColor(0x6666ff)
          .setTitle(`⚙️ | Remove`)
          .setDescription(`Usage: **${prefix}remove <@member/member ID>**`)
          .setFooter(`${prefix} | ${client.user.username}`)
          .setTimestamp()
          return message.channel.send(removeUsageEmbed);
        }
        
        if(member.id === message.author.id) return message.channel.send(`${x} | You can't remove yourself from this ticket!`);
      
        message.channel.updateOverwrite(member, {
          SEND_MESSAGES: false,
          VIEW_CHANNEL: false,
          READ_MESSAGE_HISTORY: false,
          ATTACH_FILES: false
        });

        message.delete();
        
        message.channel.send(`${v} | ${message.author}, I have **removed ${member} from this ticket** (${message.channel})!`)
      
        const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
        if(!logChannel) return;
        
        const ticketLogEmbed = new Discord.MessageEmbed()
        .setColor(0x6666ff)
        .setTitle(`⚙️ | Logs`)
        .addField(`TICKET_MEMBER_REMOVE`, `${message.author} **removed ${member} from ticket ${message.channel}**!`)
        .setFooter(`${prefix} | ${client.user.username}`)
        .setTimestamp()
        logChannel.send(ticketLogEmbed);

      }).catch(err => {

        const removeUsageEmbed = new Discord.MessageEmbed()
        .setColor(0x6666ff)
        .setTitle(`⚙️ | Remove`)
        .setDescription(`Usage: **${prefix}remove <@member/member ID>**`)
        .setFooter(`${prefix} | ${client.user.username}`)
        .setTimestamp()
        return message.channel.send(removeUsageEmbed);

      });
    }
  }

  module.exports.help = {
    name: "remove"
}