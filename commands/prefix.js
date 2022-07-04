const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args, prefix) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${x} | I couldn't change my prefix, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    if(!args[0] || !args[1]) { 
      const prefixUsageEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Prefix`)
      .setDescription(`Usage: **${process.env.PREFIX}prefix set <new prefix>**`)
      .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
      .setTimestamp()
      return message.channel.send(prefixUsageEmbed);
    }

    if(args[0] === `set`) {

      let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));

      prefixes[message.guild.id] = {
          prefixes: args[1]
      };

      fs.writeFile("./prefixes.json", JSON.stringify(prefixes), (err) => {
        if (err) console.log(err)
      });

      const prefixEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Prefix`)
      .setDescription(`${v} | My prefix has been set to: **${args[1]}**`)
      .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
      .setTimestamp()
      message.channel.send(prefixEmbed)
      .then(message.react("⚙️"));

      const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
      if(!logChannel) return;

      const prefixLogEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`⚙️ | Logs`)
      .addField(`CONFIG_PREFIX`, `My prefix has been set to: **${args[1]}**`)
      .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
      .setTimestamp()
      logChannel.send(prefixLogEmbed);
    }
  }

  module.exports.help = {
    name: "prefix"
}