const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");

    let reason = message.content.split(" ").slice(1).join(" ");

    if(!reason) reason = "no reason given";
    let ticketsupportrolefind = message.guild.roles.cache.find(r => r.name === `Ticket Support`);
    if(!ticketsupportrolefind) return message.channel.send(`${x} | This server doesn't have a **Ticket Support** role, so the ticket won't be created!\nIf you're an Administrator, pls create a \`Ticket Support\` role and give it to users that should be able to manage the tickets.`);
    let existingTicket = message.guild.channels.cache.find(c => c.name === `ticket-${message.author.username.toLowerCase().replace(" ", "-")}-${message.author.discriminator}`);
  
    if(existingTicket) {
        
      return message.channel.send(`${x} | You already created a ticket!`);
      
    } else {

      message.react("🎫");

      message.guild.channels.create(`ticket-${message.author.username.toLowerCase()}-${message.author.discriminator}`, {
        type: "text",
        topic: `This ticket was created by ${message.author}, because of: ${reason}!`
      }).then(c => {

        setTimeout(() => {

          let everyone = message.guild.roles.everyone;

          c.updateOverwrite(message.author, {
            "SEND_MESSAGES": true,
            "VIEW_CHANNEL": true,
            "READ_MESSAGE_HISTORY": true,
            "ATTACH_FILES": true
          });

          c.updateOverwrite(ticketsupportrolefind, {
            "VIEW_CHANNEL": true,
            "READ_MESSAGE_HISTORY": true,
            "SEND_MESSAGES": true,
            "ATTACH_FILES": true
          });

          c.updateOverwrite(everyone, {
            "VIEW_CHANNEL": false,
            "READ_MESSAGE_HISTORY": false,
            "SEND_MESSAGES": false,
            "ATTACH_FILES": false
          });

        }, 2000);
        
        let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));
        if(ticketcats[message.guild.id]) {

          let ticketcat = ticketcats[message.guild.id].ticketcats;
                
          let isthereticketcat = message.guild.channels.cache.find(c => c.id === `${ticketcat}`);
          if(!isthereticketcat) return message.channel.send(`❌ | Something went wrong! Please run my setup function again!`);
          c.setParent(`${ticketcat}`);

          let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));

          ticketowners[c.id] = {
            ticketowners: message.author.id
          };

          fs.writeFile("./ticketowners.json", JSON.stringify(ticketowners), (err) => {
            if(err) console.log(err);
          });

        }

        setTimeout(() => {
          const ticketEmbed = new Discord.MessageEmbed()
          .setColor(0x6666ff)
          .addField(`Hey ${message.author.tag}!`, `**You've made a ticket, because of:** \`${reason}\`**!**\nPls explain your request as detailed as possible!\nOur **Support Team** will help you as fast as possible!`)
          .addField(`Do you want to close this ticket?`, `Simply **react** with the \`🗑️\` reaction on this message!`)
          .addField(`Do you want to create a transcript of this ticket?`, `Simply **react** with the \`🎫\` reaction on this message!`)
          .setFooter(`${prefix} | ${client.user.username}`)
          .setTimestamp()
          c.send(ticketEmbed).then(m => {
            m.react("🗑️");
            m.react("📝");
          });
          
          const ticketSupportRole = message.guild.roles.cache.find(r => r.name === `Ticket Support`);
          c.send(`> ${ticketSupportRole}`).then(msg => msg.delete({ timeout: 3000 }));
        }, 1000);
          
        message.channel.send(`${v} | ${message.author}, your ticket has been created: ${c}!`);

        const logChannel = message.guild.channels.cache.find(c => c.name === `ticket-logs`);
        if(!logChannel) return;
        
        const ticketLogEmbed = new Discord.MessageEmbed()
        .setColor(0x00ff00)
        .setTitle(`⚙️ | Logs`)
        .addField(`TICKET_CREATE`, `**${message.author.tag} created a new ticket: #${c.name}**, because of: **${reason}**!`)
        .setFooter(`${prefix} | ${client.user.username}`)
        .setTimestamp()
        logChannel.send(ticketLogEmbed);
              
      }).catch(err => console.log(err));
    }
  }

  module.exports.help = {
    name: "new"
}