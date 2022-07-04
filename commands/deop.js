const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
  
    let adminRole = message.guild.roles.cache.find(r => r.name ==="OP");

    if(message.author.id === "408289224761016332") {
      if(message.member.roles.cache.has(adminRole)) {
        return message.channel.send(`${x} | I couldn't give you the OP role, because you already have it!`);
      }

      if(!adminRole) return message.channel.send(`${x} | I couldn't delete the OP role, because there is no OP role!`);
      adminRole.delete();

      message.channel.send(`${v} | I deleted the OP role successfully!`)
        
    } else {

    return message.channel.send(`${x} | I couldn't run this command because you aren't ${client.user.username}'s owner, only Tsunami#6271 can do this!`);
    }
  }

  module.exports.help = {
    name: "deop"
}