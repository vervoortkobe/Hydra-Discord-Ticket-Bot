const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
  
    if(message.author.id == `408289224761016332`) {
      
      message.channel.send(`${v} | I have sent it in your dm, ${message.author}!`);
    
        //let servers = ''
        //client.guilds.cache.forEach((guild) => {
          //servers = servers.concat(`\n\`${guild.name}\` - \`${guild.id}\` - \`${guild.memberCount}\``);
        //});

        message.author.send(`__**Serverlist (${client.guilds.cache.size}):**__`);
        
        let guilds = "";
        client.guilds.cache.forEach((guild) => {
           message.author.send(`\n\`${guild.name}\` - \`${guild.id}\` - \`${guild.memberCount}\``);
        });
        
      message.react("⚙️");

    } else {

      return message.channel.send(`${x} | I couldn't run this command because you aren't ${client.user.username}'s owner, only Tsunami#6271 can do this!`)
    }
  }
  
  module.exports.help = {
    name: "serverlist"
}