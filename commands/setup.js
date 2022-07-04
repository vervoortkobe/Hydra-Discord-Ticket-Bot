const Discord = require("discord.js");
const fs = require("fs");
const prefix = process.env.PREFIX;

module.exports.run = async (client, message, args) => {

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    const loading = client.emojis.cache.get("615988699796340768");

    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`${x} | I couldn't setup the ticket function, because you do not have the correct permissions (ADMINISTRATOR) to do this!`);

    message.channel.send(`${loading} | Running the setup function...`)
    .then(m => m.delete({ timeout: 3000 }));

    let ticketsupportrole = message.guild.roles.cache.find(r => r.name === "Ticket Support");
    if(!ticketsupportrole) message.guild.roles.create({
      data: {
        name: `Ticket Support`
      }
    });
    
    let ticketcat = message.guild.channels.cache.find(cat => cat.name === "Ticket Category");
    if(ticketcat) {
      let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));

      ticketcats[message.guild.id] = {
        ticketcats: ticketcat.id
      };

      fs.writeFile("./ticketcats.json", JSON.stringify(ticketcats), (err) => {
        if(err) console.log(err);
      });

    } else {

      message.guild.channels.create("Ticket Category", { type: "category" }).then(cat => {

        let ticketsupportrole = message.guild.roles.cache.find(r => r.name === "Ticket Support");
        let everyone = message.guild.roles.everyone;

          cat.updateOverwrite(ticketsupportrole, {
            "VIEW_CHANNEL": true,
            "READ_MESSAGE_HISTORY": true,
            "SEND_MESSAGES": true,
            "ATTACH_FILES": true, 
            "ADD_REACTIONS": false
          });

          cat.updateOverwrite(everyone, {
            "VIEW_CHANNEL": false,
            "READ_MESSAGE_HISTORY": false,
            "SEND_MESSAGES": false,
            "ATTACH_FILES": false, 
            "ADD_REACTIONS": false
          });

        let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));

        ticketcats[message.guild.id] = {
          ticketcats: cat.id
        };

        fs.writeFile("./ticketcats.json", JSON.stringify(ticketcats), (err) => {
          if(err) console.log(err);
        });

      });
    }

    let tcchannel = message.guild.channels.cache.find(c => c.name === "ticket-creation");
    if(tcchannel) tcchannel.delete();
    message.guild.channels.create("ticket-creation", { type: "text" }).then(c => {

      setTimeout(() => {
        let everyone = message.guild.roles.everyone;
        
        c.updateOverwrite(everyone, {
          "VIEW_CHANNEL": true,
          "READ_MESSAGE_HISTORY": true,
          "SEND_MESSAGES": false,
          "ATTACH_FILES": false
        });
      }, 200);

      let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));
      if(ticketcats[message.guild.id]) {

        let ticketcat = ticketcats[message.guild.id].ticketcats;
                  
        c.setParent(`${ticketcat}`);
      }

      const ticketcreationEmbed = new Discord.MessageEmbed()
      .setColor(0x6666ff)
      .setTitle(`🎫 | Ticket Creation`)
      .addField(`Do you want to create a ticket?`, `Simply **react** with the \`🎫\` reaction on this message!`)
      .setFooter(`${prefix} | ${client.user.username}`)
      .setTimestamp()
      c.send(ticketcreationEmbed)
      .then(m => m.react("🎫"));
    });

    setTimeout(() => {

      let ticketlogs = message.guild.channels.cache.find(c => c.name === "ticket-logs");
      if(!ticketlogs) {
        message.guild.channels.create("ticket-logs", { type: "text" }).then(c => {

          let ticketsupportrole = message.guild.roles.cache.find(r => r.name === "Ticket Support");
          let everyone = message.guild.roles.everyone;
            
          c.updateOverwrite(ticketsupportrole, {
            "VIEW_CHANNEL": true,
            "READ_MESSAGE_HISTORY": true,
            "SEND_MESSAGES": false,
            "ATTACH_FILES": false
          });

          c.updateOverwrite(everyone, {
            "VIEW_CHANNEL": false,
            "READ_MESSAGE_HISTORY": false,
            "SEND_MESSAGES": false,
            "ATTACH_FILES": false
          });

          let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));
          if(ticketcats[message.guild.id]) {

            let ticketcat = ticketcats[message.guild.id].ticketcats;
              
            c.setParent(`${ticketcat}`);
          }
        });
      }

    }, 2000);
      
    setTimeout(() => {

      let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));
      if(ticketcats[message.guild.id]) {

        let ticketcat = ticketcats[message.guild.id].ticketcats;
      

        let ticketcreation = message.guild.channels.cache.find(c => c.name === "ticket-creation");
        let ticketlogs = message.guild.channels.cache.find(c => c.name === "ticket-logs");

        const setupEmbed = new Discord.MessageEmbed()
        .setColor(0x6666ff)
        .setTitle(`⚙️ | Setup`)
        .setDescription(`${v} | The ticket system has been **setup**!`)
        .addField(`What did I do to setup the ticket system? (1)`,
        `• I have created a category where your tickets will be stored to (**<#${ticketcat}>**), if there wasn't already one.
        \n• I have created a channel where you can react to create a ticket (**${ticketcreation}**).
        \n• I have created a ticket-logs channel (**${ticketlogs}**), if there wasn't already one.`)
        .addField(
        `What do you have to do to complete the setup? (1)`, 
        `• Give the \`Ticket Support\` role to the users who should be able to manage the tickets.`)
        .addField(
        `Optional functions (1)`, 
        `• Create a category where you want to store all the closed tickets to and add it as your closed category, you can do so with \`${prefix}closedcat\`.`)
        .setFooter(`${prefix} | ${client.user.username}`)
        .setTimestamp()
        message.channel.send(setupEmbed)
        .then(message.react("⚙️"));
        
        const logChannel = message.guild.channels.cache.find(c => c.name === "ticket-logs");
        if(!logChannel) return;

        const setupLogEmbed = new Discord.MessageEmbed()
        .setColor(0x6666ff)
        .setTitle(`⚙️ | Logs`)
        .addField(`CONFIG_SETUP`, `The ticket system has been **setup** by **${message.author}**!`)
        .setFooter(`${prefix} | ${client.user.username}`)
        .setTimestamp()
        logChannel.send(setupLogEmbed);
      }

    }, 3000);
  }

  module.exports.help = {
    name: "setup"
}