const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
  
    if(message.author.id == `408289224761016332`) {
    
      const findServer = client.guilds.cache.get(args[0]);
      if(!findServer) return message.channel.send(`${x} | Pls define a valid server!`);
      const firstChannel = findServer.channels.cache.filter(c => c.type === 'text').find(x => x.position == 0);
      if(!firstChannel) return message.channel.send(`${x} | I couldn't create an invite for this server, because this server doesn't have any textchannels!`);
      if(!args[0]) {
        const createinvUsageEmbed = new Discord.MessageEmbed()
        .setColor(0x6666ff)
        .setTitle(`⚙️ | Create Invite`)
        .setDescription(`Usage: **${prefix}createinv <server ID>**`)
        .addField(`⚠️ | Warning`, `<server ID> HAS TO BE AN ID, GIVING THE SERVER'S NAME DOESN'T WORK!!!`)
        .setFooter(`${prefix} | ${client.user.username}`)
        .setTimestamp()
        return message.channel.send(createinvUsageEmbed);
      }

      let invite = await firstChannel.createInvite({ maxAge: 86400, maxUses: 10 }).catch(console.error);
      message.channel.send(`${v} | I have sent it in your dm, ${message.author}!`)
      .then(message.react("⚙️"));
      message.member.send(`Here is an invite of \`${findServer.name}\`, with ID: \`${findServer.id}\`.\n${invite}`);

    } else {

      return message.channel.send(`${x} | I couldn't run this command because you aren't ${client.user.username}'s owner, only Tsunami#6271 can do this!`)
    }
  }
  
  module.exports.help = {
    name: "createinv"
}