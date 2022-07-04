const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${x} | I couldn't set the ticket category, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    if(!args[0] || !args[1]) {
      const ticketcatUsageEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Ticket Category`)
      .setDescription(`Usage: **${prefix}ticketcat set <category ID>**`)
      .addField(`⚠️ | Warning`, `**<category ID> has to be an ID, mentioning the category does not work!**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      return message.channel.send(ticketcatUsageEmbed);
    }

    if(args[0] === `set`) {

      let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));

      ticketcats[message.guild.id] = {
          ticketcats: args[1]
      };

      fs.writeFile("./ticketcats.json", JSON.stringify(ticketcats), (err) => {
        if(err) console.log(err);
      });

      const ticketcatEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Ticket Category`)
      .setDescription(`${v} | The ticket category has been set to: **<#${args[1]}>**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(ticketcatEmbed)
      .then(message.react("⚙️"));

      const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
      if(!logChannel) return;

      const ticketcatLogEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Logs`)
      .addField(`CONFIG_TICKET_CATEGORY`, `The ticket category has been set to: **<#${args[1]}>**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      logChannel.send(ticketcatLogEmbed)
    }
  }

  module.exports.help = {
    name: "ticketcat"
}