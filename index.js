const express = require("express");
var Client = require("uptime-robot");

const app = express();

app.get("/", (req, res) => {
  res.send("online");
});

app.use(express.static("public"));

const listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port: " + listener.address().port);
});

///////////////////////////////////////////////////////////////////////////////////

const Discord = require("discord.js");
const fs = require("fs");
const client = new Discord.Client({ disableEveryone: true, ws: { intents: new Discord.Intents(Discord.Intents.ALL) }, partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION"] });
client.commands = new Discord.Collection();

const v = client.emojis.cache.get("615983179341496321");
const x = client.emojis.cache.get("615983201156071424");
const loading = client.emojis.cache.get("615988699796340768");

  fs.readdir("./commands/", (err, files) => {
 
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0){
      console.log("Can/'t find the commands map!");
      return;
    }
   
    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`);
      console.log(`${f} was loaded!`);
      client.commands.set(props.help.name, props);
    });
  });


  client.on("ready", async () => {
    console.log(`${client.user.tag} was started!`);
    client.user.setActivity(`Going offline soon! | ${process.env.PREFIX}help | ${client.user.username}`, {type: "PLAYING"});
  });

/////////////////////////////////////////////////////////////////////////////////////////////

  //GUILDS LOG JOIN
  client.on("guildCreate", guild => {

    const guildslogjoinChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `hydra-guilds-log`);
    if(!guildslogjoinChannel) return console.log(`WARNINGERROR: There is no channel named #hydra-guilds-log in the server with id: 516227189251768330!`);

    guild.members.fetch(guild.ownerID)
    .then(owner => {

      if(!owner) {

        console.log(`I have joined ${guild.name} (guild id: ${guild.id}), guild owner id: ${guild.ownerID}. This guild has ${guild.memberCount} members!`);

        const guildslogjoinEmbed = new Discord.MessageEmbed()
        .setColor(0x00ff00)
        .setTitle(`⚙️ | Guilds Log Join`)
        .setThumbnail(guild.iconURL())
        .addField(`GUILD_JOINED`, `I have **joined** \`${guild.name}\`!`, true)
        .addField(`Guild ID`, `\`${guild.id}\``, true)
        .addField(`Guild Owner ID`, `\`${guild.ownerID}\``, true)
        .addField(`Guild Members`, `This guild has \`${guild.memberCount}\` members!`, true)
        .addField(`Servers`, `Serving \`${client.guilds.cache.size}\` servers!`, true)
        .addField(`Cached Users`, `Serving \`${client.users.cache.size}\` users!`, true)
        .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
        .setTimestamp()
        guildslogjoinChannel.send(guildslogjoinEmbed);

      }

      console.log(`I have joined ${guild.name} (guild id: ${guild.id}), guild owner: ${owner.user.tag} (guild owner id: ${guild.ownerID}. This guild has ${guild.memberCount} members!`);

      const guildslogjoinEmbed = new Discord.MessageEmbed()
      .setColor(0x00ff00)
      .setTitle(`⚙️ | Guilds Log Join`)
      .setThumbnail(guild.iconURL())
      .addField(`GUILD_JOINED`, `I have **joined** \`${guild.name}\`!`, true)
      .addField(`Guild ID`, `\`${guild.id}\``, true)
      .addField(`Guild Owner`, `\`${owner.user.tag}\``, true)
      .addField(`Guild Owner ID`, `\`${guild.ownerID}\``, true)
      .addField(`Guild Members`, `This guild has \`${guild.memberCount}\` members!`, true)
      .addField(`Servers`, `Serving \`${client.guilds.cache.size}\` servers!`, true)
      .addField(`Cached Users`, `Serving \`${client.users.cache.size}\` users!`, true)
      .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
      .setTimestamp()
      guildslogjoinChannel.send(guildslogjoinEmbed);

    }).catch(err => {

      console.log(`I have joined ${guild.name} (guild id: ${guild.id}), guild owner id: ${guild.ownerID}. This guild has ${guild.memberCount} members!`);

      const guildslogjoinEmbed = new Discord.MessageEmbed()
      .setColor(0x00ff00)
      .setTitle(`⚙️ | Guilds Log Join`)
      .setThumbnail(guild.iconURL())
      .addField(`GUILD_JOINED`, `I have **joined** \`${guild.name}\`!`, true)
      .addField(`Guild ID`, `\`${guild.id}\``, true)
      .addField(`Guild Owner ID`, `\`${guild.ownerID}\``, true)
      .addField(`Guild Members`, `This guild has \`${guild.memberCount}\` members!`, true)
      .addField(`Servers`, `Serving \`${client.guilds.cache.size}\` servers!`, true)
      .addField(`Cached Users`, `Serving \`${client.users.cache.size}\` users!`, true)
      .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
      .setTimestamp()
      guildslogjoinChannel.send(guildslogjoinEmbed);

    });
  });

  //GUILDS LOG LEAVE
  client.on("guildDelete", guild => {

    console.log(`I have left ${guild.name} (guild id: ${guild.id}), guild owner id: ${guild.ownerID}. This guild has ${guild.memberCount} members!`);

    const guildslogleaveChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `hydra-guilds-log`);
    if(!guildslogleaveChannel) return console.log(`WARNINGERROR: There is no channel named #hydra-guilds-log in the server with id: 516227189251768330!`);

    const guildslogleaveEmbed = new Discord.MessageEmbed()
    .setColor(0xff0000)
    .setTitle(`⚙️ | Guilds Log Leave`)
    .setThumbnail(guild.iconURL())
    .addField(`GUILD_LEFT`, `I have **left** \`${guild.name}\`!`, true)
    .addField(`Guild ID`, `\`${guild.id}\``, true)
    .addField(`Guild Owner ID`, `\`${guild.ownerID}\``, true)
    .addField(`Guild Members`, `This guild has \`${guild.memberCount}\` members!`, true)
    .addField(`Servers`, `Serving \`${client.guilds.cache.size}\` servers!`, true)
    .addField(`Cached Users`, `Serving \`${client.users.cache.size}\` users!`, true)
    .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
    .setTimestamp()
    guildslogleaveChannel.send(guildslogleaveEmbed);
  });

////////////////////////////////////////////////////////////////////////////////////////////////////

  client.on("messageReactionAdd", async (reaction, user) => {

    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();

    const v = client.emojis.cache.get("615983179341496321");
    const x = client.emojis.cache.get("615983201156071424");
    const loading = client.emojis.cache.get("615988699796340768");
    
////////////////////////////////////////////////////////////////////////////////////////////////////
//CREATE TICKET REACTION

    if(!user.bot && reaction.message.author.id === client.user.id) {
      if(reaction.emoji.name === "🎫") {
        reaction.message.reactions.resolve("🎫").users.remove(user);

        let reason = "No reason given";
        let ticketsupportrolefind = reaction.message.guild.roles.cache.find(r => r.name === `Ticket Support`);
        if(!ticketsupportrolefind) return reaction.message.channel.send(`${x} | This server doesn't have a **Ticket Support** role, so the ticket won't be created!\nIf you're an Administrator, pls create a \`Ticket Support\` role and give it to users that should be able to manage the tickets.`);
        let existingTicket = reaction.message.guild.channels.cache.find(c => c.name === `ticket-${user.username.toLowerCase().replace(" ", "-")}-${user.discriminator}`);
        
        if(existingTicket) {
          return reaction.message.channel.send(`${x} | You already created a ticket!`)
          .then(m => m.delete({ timeout: 5000 }));
        } else {

          reaction.message.guild.channels.create(`ticket-${user.username.toLowerCase()}-${user.discriminator}`, { type: "text", topic: `This ticket was created by ${user}, because of: ${reason}!` }).then(c => {

            setTimeout(() => {

              let everyone = reaction.message.guild.roles.everyone;

              c.updateOverwrite(user, {
                "SEND_MESSAGES": true,
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "ATTACH_FILES": true, 
                "ADD_REACTIONS": false
              });

              c.updateOverwrite(ticketsupportrolefind, {
                "SEND_MESSAGES": true,
                "VIEW_CHANNEL": true,
                "READ_MESSAGE_HISTORY": true,
                "ATTACH_FILES": true, 
                "ADD_REACTIONS": false
              });

              c.updateOverwrite(everyone, {
                "SEND_MESSAGES": false,
                "VIEW_CHANNEL": false,
                "READ_MESSAGE_HISTORY": false,
                "ATTACH_FILES": false, 
                "ADD_REACTIONS": false
              });

            }, 2000);
              
            let ticketcats = JSON.parse(fs.readFileSync("./ticketcats.json", "utf-8"));
            if(ticketcats[reaction.message.guild.id]) {

              let ticketcat = ticketcats[reaction.message.guild.id].ticketcats;
                        
              let isthereticketcat = reaction.message.guild.channels.cache.find(c => c.id === `${ticketcat}`);
              if(!isthereticketcat) return reaction.message.channel.send(`❌ | Something went wrong! Please run my setup function again!`);
              c.setParent(`${ticketcat}`);

              let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));

              ticketowners[c.id] = {
                ticketowners: user.id
              };

              fs.writeFile("./ticketowners.json", JSON.stringify(ticketowners), (err) => {
                if(err) console.log(err);
              });

            }

            setTimeout(() => {
              const ticketEmbed = new Discord.MessageEmbed()
              .setColor(0x6666ff)
              .addField(`Hey, ${user.tag}!`, `**You've made a ticket, because of:** \`${reason}\`**!**\nPls explain your request as detailed as possible!\nOur **Support Team** will help you as fast as possible!`)
              .addField(`Do you want to close this ticket?`, `Simply **react** with the \`🗑️\` reaction on this message!`)
              .addField(`Do you want to create a transcript of this ticket?`, `Simply **react** with the \`📝\` reaction on this message!`)
              .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
              .setTimestamp()
              c.send(ticketEmbed).then(m => {
                m.react("🗑️");
                m.react("📝");
              });
                  
              const ticketSupportRole = reaction.message.guild.roles.cache.find(r => r.name === `Ticket Support`);
              c.send(`> ${ticketSupportRole}`).then(msg => msg.delete({ timeout: 3000 }));
            }, 1000);
                  
            reaction.message.channel.send(`${v} | ${user}, your ticket has been created: <#${c.id}>!`)
            .then(m => m.delete({ timeout: 5000} ));

            const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
            if(!logChannel) return;
                
            const ticketLogEmbed = new Discord.MessageEmbed()
            .setColor(0x00ff00)
            .setTitle(`⚙️ | Logs`)
            .addField(`TICKET_CREATE`, `**${user.tag} created a new ticket: #${c.name}**, because of: **${reason}**!`)
            .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
            .setTimestamp()
            logChannel.send(ticketLogEmbed);

          });
        }
      }
    }

/////////////////////////////////////////////////////////////////////////////////////////////
//CLOSE TICKET REACTION

    if(reaction.message.channel.name.startsWith("ticket-") && reaction.message.channel.name !== "ticket-creation" && reaction.message.channel.name !== "ticket-logs" && !user.bot && reaction.message.author.id === client.user.id) {
      if(reaction.emoji.name === "🗑️") {
        reaction.message.reactions.resolve("🗑️").users.remove(user);
      
        let closedcats = JSON.parse(fs.readFileSync("./closedcats.json", "utf-8"));
        if(closedcats[reaction.message.guild.id] && reaction.message.guild.channels.cache.find(c => c.id === closedcats[reaction.message.guild.id])) {
        let closedcat = closedcats[reaction.message.guild.id].closedcats;
          
          if(reaction.message.channel.parent.id === `${closedcat}`) {

            //DELETED IN CLOSEDCAT // SEND TRANSCRIPT TO LOGS
            
            reaction.message.channel.send(`${v} | I will ***delete*** this ticket in \`10\` seconds...`)
            setTimeout(() => {

              reaction.message.channel.messages.fetch()
                .then(messages => {

                var text;

                for(let [key, value] of messages) {
                  const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");

                  let avatars = "<img src=" + value.author.displayAvatarURL() + ">";

                  if(value.embeds[0]) {
                    text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
                  }

                  text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
                }
            
                let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
                let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
                let output = body.replace("undefined", "<br>");
            
                fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
                  if(err) console.log(err);
                });

              });

              reaction.message.channel.delete();
                  
              const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
              if(!logChannel) return;
          
              const deleteLogEmbed = new Discord.MessageEmbed()
              .setColor(0xff0000)
              .setTitle(`⚙️ | Logs`)
              .addField(`TICKET_DELETE`, `**${user.tag}  deleted a ticket: #${reaction.message.channel.name}**!\nI have created a **transcript** of **this ticket**!\nCheck the file below this message. ⬇️`)
              .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
              .setTimestamp()
              logChannel.send(deleteLogEmbed);
              logChannel.send({ files: ["./ticket-transcript.html"] });
              
            }, 10000);
            
          } else {

            //CLOSED & MOVED TO CLOSEDCAT // SEND TRANSCRIPT TO TICKETOWNER
          
            reaction.message.channel.send(`${v} | I will ***close*** this ticket in \`10\` seconds...`)
            setTimeout(() => {

              reaction.message.channel.messages.fetch()
              .then(messages => {

                var text;

                for(let [key, value] of messages) {
                  const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");

                  let avatars = "<img src=" + value.author.displayAvatarURL() + ">";

                  if(value.embeds[0]) {
                    text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
                  }

                  text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
                }
            
                let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
                let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
                let output = body.replace("undefined", "<br>");
            
                fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
                  if(err) console.log(err);
                });

              });

              let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
              if(ticketowners[reaction.message.channel.id]) {
              let ticketowner = ticketowners[reaction.message.channel.id].ticketowners;

                const findTicketowner = reaction.message.guild.members.cache.get(ticketowner);
                if(findTicketowner) {
                  const dmTicketownerEmbed = new Discord.MessageEmbed()
                  .setColor(0x6666ff)
                  .setTitle(`⚙️ | Ticket Closed`)
                  .setDescription(`Your **ticket** (#${reaction.message.channel.name}) was **closed**!\nIf you want a transcript of it, check the file below this message. ⬇️`)
                  .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
                  .setTimestamp()
                  findTicketowner.send(dmTicketownerEmbed);
                  findTicketowner.send({ files: ["./ticket-transcript.html"] });
                }
              }
                
              setTimeout(() => {

                reaction.message.channel.members.forEach(m => {
                  if(!m.user.bot && !m.roles.cache.has(`Ticket Support`)) {
                    reaction.message.channel.updateOverwrite(m, {
                      "SEND_MESSAGES": false,
                      "VIEW_CHANNEL": false,
                      "READ_MESSAGE_HISTORY": false,
                      "ATTACH_FILES": false, 
                      "ADD_REACTIONS": false
                    });
                  }
                });
                  
                let tisurole = reaction.message.guild.roles.cache.find(r => r.name === "Ticket Support");
                let everyone = reaction.message.guild.roles.everyone;

                reaction.message.channel.updateOverwrite(tisurole, {
                  "SEND_MESSAGES": true,
                  "VIEW_CHANNEL": true,
                  "READ_MESSAGE_HISTORY": true,
                  "ATTACH_FILES": true, 
                  "ADD_REACTIONS": false
                });
                
                reaction.message.channel.updateOverwrite(everyone, {
                  "SEND_MESSAGES": false,
                  "VIEW_CHANNEL": false,
                  "READ_MESSAGE_HISTORY": false,
                  "ATTACH_FILES": false, 
                  "ADD_REACTIONS": false
                });

              }, 2000);
              
              reaction.message.channel.send(`${v} | **${user} closed this ticket: #${reaction.message.channel.name}**!`);
              
              const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
              if(!logChannel) return;
          
              const closeLogEmbed = new Discord.MessageEmbed()
              .setColor(0xff5858)
              .setTitle(`⚙️ | Logs`)
              .addField(`TICKET_CLOSE`, `**${user.tag} closed a ticket: #${reaction.message.channel.name}**!`)
              .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
              .setTimestamp()
              logChannel.send(closeLogEmbed);

              let isthereclosedcat = reaction.message.guild.channels.cache.find(c => c.id === `${closedcat}`);
              if(!isthereclosedcat) return;
              reaction.message.channel.setParent(`${closedcat}`);

            }, 10000);
          }
          
        } else {

          //DELETED IN TICKETCAT & NO CLOSEDCAT // SEND TRANSCRIPT TO TICKETOWNER & LOGS

          reaction.message.channel.send(`${v} | I will ***delete*** this ticket in \`10\` seconds...`)
          setTimeout(() => {

            reaction.message.channel.messages.fetch()
            .then(messages => {

              var text;

              for(let [key, value] of messages) {
                const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");

                let avatars = "<img src=" + value.author.displayAvatarURL() + ">";

                if(value.embeds[0]) {
                  text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
                }

                text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
              }
          
              let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
              let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
              let output = body.replace("undefined", "<br>");
          
              fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
                if(err) console.log(err);
              });

            });

            let ticketowners = JSON.parse(fs.readFileSync("./ticketowners.json", "utf-8"));
            if(ticketowners[reaction.message.channel.id]) {
              let ticketowner = ticketowners[reaction.message.channel.id].ticketowners;

              reaction.message.guild.members.fetch(`${ticketowner}`)
              .then(findTicketowner => {
                if(findTicketowner) {
                  const dmTicketownerEmbed = new Discord.MessageEmbed()
                  .setColor(0x6666ff)
                  .setTitle(`⚙️ | Ticket Deleted`)
                  .setDescription(`Your **ticket** (${reaction.message.channel.name}) was **deleted**!\nIf you want a transcript of it, check the file below this message. ⬇️`)
                  .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
                  .setTimestamp()
                  findTicketowner.send(dmTicketownerEmbed);
                  findTicketowner.send({ files: ["./ticket-transcript.html"] });
                }
              });
            }

            reaction.message.channel.delete();
              
            const logChannel = reaction.message.guild.channels.cache.find(c => c.name === `ticket-logs`);
            if(!logChannel) return;
          
            const deleteLogEmbed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setTitle(`⚙️ | Logs`)
            .addField(`TICKET_DELETE`, `**${user.tag} deleted a ticket: #${reaction.message.channel.name}**!\nI have created a **transcript** of **this ticket**!\nCheck the file below this message. ⬇️`)
            .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
            .setTimestamp()
            logChannel.send(deleteLogEmbed);
            logChannel.send({ files: ["./ticket-transcript.html"] });

          }, 10000);
        }
      }
    }

/////////////////////////////////////////////////////////////////////////////////////////////
//CREATE TRANSCRIPT REACTION

    if(reaction.message.channel.name.startsWith("ticket-") && reaction.message.channel.name !== "ticket-creation" && reaction.message.channel.name !== "ticket-logs" && !user.bot) {
      if(reaction.emoji.name === "📝" && reaction.message.author.id === client.user.id) {
        reaction.message.reactions.resolve("📝").users.remove(user);

        reaction.message.channel.send(`${loading} | The transcript is being created...`)
        .then(m => m.delete({ timeout: 3000 }));

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        reaction.message.channel.messages.fetch()
          .then(messages => {

            var text;

            for(let [key, value] of messages) {
              const date = new Date(value.createdTimestamp).toLocaleDateString("nl-BE");

              let avatars = "<img src=" + value.author.displayAvatarURL() + ">";

              if(value.embeds[0]) {
                text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>${value.embeds[0].title}</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.embeds[0].description}</div>`.replace("null", "");
              }

              text += `<br><div>${avatars}&nbsp;&nbsp;&nbsp;<b>${value.author.tag}</b> at ${date}:<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${value.content}</div>`;
            }
        
            let style = "body { background-color: #36393f; color: white; font-family: 'Arial', normal; } img { width: 43px; height: 43px; border-radius: 50%; } div:hover { background-color: #32353b; }";
            let body = `<head><title>Ticket Transcript • #${reaction.message.channel.name}</title><link rel="icon" type="image/png" href=${reaction.message.guild.iconURL()}></head><body>${text}</body><style>${style}</style>`;
            let output = body.replace("undefined", "<br>");
        
            fs.writeFile("./ticket-transcript.html", JSON.stringify(output), (err) => {
              if(err) console.log(err);
            });

            setTimeout(() => {
      
              const transcriptEmbed = new Discord.MessageEmbed()
              .setColor(0x6666ff)
              .setTitle(`⚙️ | Transcript`)
              .setDescription(`**${user}** created a **transcript** of ticket **#${reaction.message.channel.name}**!\nCheck the file below this message. ⬇️`)
              .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
              .setTimestamp()
              reaction.message.channel.send(transcriptEmbed);
              reaction.message.channel.send({ files: ["./ticket-transcript.html"] });

            }, 500);
          });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let logChannel = reaction.message.guild.channels.cache.find(c => c.name === "ticket-logs");
        if(!logChannel) return;
              
        const transcriptLogEmbed = new Discord.MessageEmbed()
        .setColor(0x6666ff)
        .setTitle(`⚙️ | Logs`)
        .setDescription(`**${user.tag}** created a **transcript** of ticket **#${reaction.message.channel.name}**!\nCheck the file below this message. ⬇️`)
        .setFooter(`${process.env.PREFIX} | ${client.user.username}`)
        .setTimestamp()
        logChannel.send(transcriptLogEmbed);
        logChannel.send({ files: ["./ticket-transcript.html"] });

      }
    }

  });

/////////////////////////////////////////////////////////////////////////////////////////////

  client.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
   
    //CUSTOM PREFIXES
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
    if(!prefixes[message.guild.id]) {
      prefixes[message.guild.id] = {
        prefixes: process.env.PREFIX
      }
    }
    let prefix = prefixes[message.guild.id].prefixes;
    
    // let prefix = config.prefix;
    // let prefix = process.env.PREFIX;
    if(!message.content.startsWith(prefix)) return;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = client.commands.get(command.slice(prefix.length));
    if(commandfile) commandfile.run(client, message, args);

    const commandslogChannel = client.guilds.cache.get("516227189251768330").channels.cache.find(c => c.name === `hydra-commands-log`);
    if(!commandslogChannel) return console.log(`WARNINGERROR: There is no channel named #hydra-commands-log in the server with id: 516227189251768330!`);
    if(message.content.startsWith(prefix)) commandslogChannel.send(`\`\`\`[${message.guild.name}] #${message.channel.name} > ${message.author.tag}: ${message.content}\`\`\``);


});
 
client.login(process.env.TOKEN);