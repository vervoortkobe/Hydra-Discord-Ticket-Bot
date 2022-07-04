const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
  
    if(message.author.id === `408289224761016332`) {
    
      const helpOwnerEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`🤖 | Help`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`***• Use \`${prefix}setup\` to setup the ticket system***`)
      .addField(`⛑ | Moderation (2)`, `\`${prefix}clear\`, \`${prefix}purge\``)
      .addField(`⚙️ | Configuration (4)`, `\`${prefix}closedcat\`, \`${prefix}prefix\`, \`${prefix}setup\`, \`${prefix}ticketcat\``)
      .addField(`🎟 | Tickets (8)`, `\`${prefix}add\`, \`${prefix}close\`, \`${prefix}new\`, \`${prefix}remove\`, \`${prefix}rename\`, \`${prefix}ticket\`, \`${prefix}ticketcreationgui\`, \`${prefix}transcript\``)
      .addField(`📁 | Other (2)`, `\`${prefix}membercount\`, \`${prefix}say\``)
      .addField(`📥 | About (6)`, `\`${prefix}botstats\`, \`${prefix}donate\`, \`${prefix}invite\`, \`${prefix}ping\`, \`${prefix}support\`, \`${prefix}website\``)
      .addField(`👑 | Owner (4)`, `\`${prefix}createinv\`, \`${prefix}deop\`, \`${prefix}op\`, \`${prefix}serverlist\``)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(helpOwnerEmbed)
      .then(message.react("🤖"));
    
    } else {
  
      const helpEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`🤖 | Help`)
      .setThumbnail(client.user.displayAvatarURL())
      .setDescription(`***• Use \`${prefix}setup\` to setup the ticket system***`)
      .addField(`⛑ | Moderation (2)`, `\`${prefix}clear\`, \`${prefix}purge\``)
      .addField(`⚙️ | Configuration (4)`, `\`${prefix}closedcat\`, \`${prefix}setup\`, \`${prefix}ticketcat\``)
      .addField(`🎟 | Tickets (8)`, `\`${prefix}add\`, \`${prefix}close\`, \`${prefix}new\`, \`${prefix}remove\`, \`${prefix}rename\`, \`${prefix}ticket\`, \`${prefix}ticketcreationgui\`, \`${prefix}transcript\``)
      .addField(`📁 | Other (2)`, `\`${prefix}membercount\`, \`${prefix}say\``)
      .addField(`📥 | About (6)`, `\`${prefix}botstats\`, \`${prefix}donate\`, \`${prefix}invite\`, \`${prefix}ping\`, \`${prefix}support\`, \`${prefix}website\``)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(helpEmbed)
      .then(message.react("🤖"));
    }
  }

  module.exports.help = {
    name: "help"
}