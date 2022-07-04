const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${x} | I couldn't set the closed category, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    if(!args[0] || !args[1]) {
      const closedcatUsageEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Closed Category`)
      .setDescription(`Usage: **${prefix}closedcat set <category ID>**`)
      .addField(`⚠️ | Warning`, `**<category ID> has to be an ID, mentioning the category does not work!**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      return message.channel.send(closedcatUsageEmbed);
    }

    if(args[0] === `set`) {

      let closedcats = JSON.parse(fs.readFileSync("./closedcats.json", "utf-8"));

      closedcats[message.guild.id] = {
          closedcats: args[1]
      };

      fs.writeFile("./closedcats.json", JSON.stringify(closedcats), (err) => {
        if(err) console.log(err);
      });

      const closedcatEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Closed Category`)
      .setDescription(`${v} | The closed category has been set to: **<#${args[1]}>**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(closedcatEmbed)
      .then(message.react("⚙️"));

      const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
      if(!logChannel) return;

      const closedcatLogEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Logs`)
      .addField(`CONFIG_CLOSED_CATEGORY`, `The closed category has been set to: **<#${args[1]}>**`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      logChannel.send(closedcatLogEmbed)
    }
  }

  module.exports.help = {
    name: "closedcat"
}