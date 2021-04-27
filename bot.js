const pm2 = require("pm2")

const fs = require("fs");

const Discord = require("discord.js");

const discordTTS = require("discord-tts");

const {
  prefix,
  channelIDs,
  color,
  defaultCooldown,
  inPublicVCRoleID,
} = require("./config.json");

const dotenv = require("dotenv").config();

const keepAlive = require("./server");

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.commands = new Discord.Collection();

module.exports.client = client;

module.exports.githubtoken = process.env.githubtoken;

module.exports.Nigelrextoken = process.env.Nigelrextoken;

const webhookID = process.env.webhookurl.substr(33, 18);

const webhookToken = process.env.webhookurl.substr(52, 68);

const creationsWebhook = new Discord.WebhookClient(webhookID, webhookToken);

const scaleImage = require("./scale");

const { response } = require("express");

const { waitForDebugger } = require("inspector");

const request = require("request").defaults({ encoding: null });

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

// Bot Turned on Notification
client.once("ready", () => {
  console.log("CraftYourWorld Bot is Online!");
  client.user.setActivity("Your World...", { type: "WATCHING" });
});

// Image Resizer (AKA) Picasso!
client.on("message", (message) => {
  if (
    !message.content.startsWith(`${prefix}scale`) &&
    !message.content.startsWith(`${prefix}image`)
  )
    return;

  if (message.author.bot) return;

  if (message.reference)
    scaleAndSend(
      message.referencedMessage.attachments.first(),
      message.channel
    );
  else
    inputAttachment = scaleAndSend(
      message.attachments.first(),
      message.channel
    );
});

const scaleAndSend = (inputAttachment, channel) => {
  if (inputAttachment == undefined) {
    channel.send({
      embed: {
        title:
          'There was no attachment on that message.\ntype "scale" or "image" with an image, or type "scale" or "image" the bot in a reply to an image to scale it.',
      },
    });
    return;
  }

  const inputAttachmentURL = inputAttachment.url;

  request.get(inputAttachmentURL, (_err, _res, body) => {
    scaleImage(body)
      .then((buffer) => {
        const outputAttachment = new Discord.MessageAttachment(
          buffer,
          "response.png"
        );
        channel.send(outputAttachment);
      })
      .catch((error) => {
        channel.send(`There was an error trying to do that:\n\`${error}\``);
        // console.error(error)
      });
  });
};

client.on("message", (message) => {
  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply({
      embed: { title: "there was an error trying to execute that command!" },
    });
  }
});

client.on("message", (message) => {
  if (message.content === `${prefix}server`) {
    message.channel.send(
      `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`
    );
  } else if (message.content === `!d bump`) {
    message.reply(`Thanks For Bumping The Server 😄 👍`);
  } else if (message.content === `stupid bot`) {
    message
      .reply(`I am not stupid 😢,\nIt's you stupid not me 👊`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `Stupid bot`) {
    message
      .reply(`I am not stupid 😢,\nIt's you stupid not me 👊`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `Stupid Bot`) {
    message
      .reply(`I am not stupid 😢,\nIt's you stupid not me 👊`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `STUPID BOT`) {
    message
      .reply(`I am not stupid 😢,\nIt's you stupid not me 👊`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `good bot`) {
    message
      .reply(`Thanks 😄`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `Good Bot`) {
    message
      .reply(`Thanks 😄`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `GOOD BOT`) {
    message
      .reply(`Thanks 😄`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `nice bot`) {
    message
      .reply(`Thanks 😄`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `Nice bot`) {
    message
      .reply(`Thanks 😄`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `Nice Bot`) {
    message
      .reply(`Thanks 😄`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content === `NICE BOT`) {
    message
      .reply(`Thanks 😄`)
      .then((response) => response.delete({ timeout: 5000 }));
  } else if (message.content ===`help`){
    message.reply({embed:{title:`We can\'t help you if you can\'t state your problem! 🤷`}})
  } else if (message.content ===`HELP`){
    message.reply({embed:{title:`We can\'t help you if you can\'t state your problem! 🤷`}})
  }
});

// Rules!
client.on("message", (message) => {
  if (message.content === `rules`) {
    message.delete();

    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields(
        {
          name: "**Rule 1**",
          value:
            "\n**Common Sense :** Try Not To Post Your Personal Info Anywhere On This Server! \nThis Might Lead You To Hackers Taking Over Your Personal Information And Threaten You!",
          inline: false,
        },
        {
          name: "**Rule 2**",
          value:
            "\n**Language :** Please stick to English so we can understand you.",
          inline: false,
        },
        {
          name: "**Rule 3**",
          value:
            "\n**Staff :** Do Not DM Or Friend Request The Staff Members At Any Cost, Unless And Untill We Tell You.\nWhat The Moderators Say The Rules Mean, The Rules Mean.",
          inline: false,
        },
        {
          name: "**Rule 4**",
          value:
            "\n**Chat :** No spamming. This Includes Starting Or Continuing Emoji Trains, Message Trains, etc.\nNo Loopholes. These rules Are Not Comprehensive And Are Subject To Common Sense.",
          inline: false,
        },
        {
          name: "**Rule 5**",
          value: "\n**Social :** Be respectful. This includes no swearing.",
          inline: false,
        },
        {
          name: "**Rule 6**",
          value:
            "\n**Channels :** Keep Chat In The Correct Channels, To Avoid Any Misunderstanding Or Frustration/Anger Of Other people On You.",
          inline: false,
        },
        {
          name: "**Rule 7**",
          value:
            "\n**NSFW :** NSFW Is Not Allowed. This Includes Messages, Images,Avatars, Usernames, And Custom Status Texts.",
          inline: false,
        },
        {
          name: "**Rule 8**",
          value:
            "\n**Advertising :** Advertising On This Server is Strictly Not Allowed, Do Not Advertise Your Youtube Channel And Other Social Media Lead You To A Warn At First And Then Ban, So To Avoid It.",
          inline: false,
        },
        {
          name: "**Rule 9**",
          value:
            "\n**Access :** Now once You Read All The Rules You Have To React ✅ To Gain Access To The Rest Of This Server So You Could Explore The possibilities Of Everyone's Work!",
          inline: false,
        }
      )
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed }).then((reactionMessage) => {
      reactionMessage.react("✅");
    });
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild) return;

  if (reaction.message.id == "804571013392105473") {
    if (reaction.emoji.name == "✅") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("789838234203979786")
        .then
        .roles.add("828588307445055489");
    }
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild) return;

  if (reaction.message.id == "804571013392105473") {
    if (reaction.emoji.name == "✅") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("789838234203979786")
        .then
        .roles.remove("828588307445055489");
    }
  }
});

client.on("message", (message) => {
  if (message.content === `rule1`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields({
        name: "**Rule 1**",
        value:
          "\n**Common Sense :** Try Now To Post Your Personal Info Anywhere On This Server! \nThis Might Lead You To Hackers Taking Over Your Personal Information And Threaten You!",
        inline: false,
      })
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `rule2`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields({
        name: "**Rule 2**",
        value:
          "\n**Language :** Please stick to English so we can understand you.",
        inline: false,
      })
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `rule3`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields({
        name: "**Rule 3**",
        value:
          "\n**Staff :** Do Not DM Or Friend Request The Staff Members At Any Cost, Unless And Untill We Tell You.\nWhat The Moderators Say The Rules Mean, The Rules Mean.",
        inline: false,
      })
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `rule4`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields({
        name: "**Rule 4**",
        value:
          "\n**Chat :** No spamming. This Includes Starting Or Continuing Emoji Trains, Message Trains, etc.\nNo Loopholes. These rules Are Not Comprehensive And Are Subject To Common Sense.",
        inline: false,
      })
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `rule5`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields({
        name: "**Rule 5**",
        value: "\n**Social :** Be respectful. This includes no swearing.",
        inline: false,
      })
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `rule6`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields({
        name: "**Rule 6**",
        value:
          "\n**Channels :** Keep Chat In The Correct Channels, To Avoid Any Misunderstanding Or Frustration/Anger Of Other people On You.",
        inline: false,
      })
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `rule7`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields({
        name: "**Rule 7**",
        value:
          "\n**NSFW :** NSFW Is Not Allowed. This Includes Messages, Images,Avatars, Usernames, And Custom Status Texts.",
        inline: false,
      })
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `rule8`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields({
        name: "**Rule 8**",
        value:
          "\n**Advertising :** Advertising On This Server is Strictly Not Allowed, Do Not Advertise Your Youtube Channel And Other Social Media Lead You To A Warn At First And Then Ban, So To Avoid It.",
        inline: false,
      })
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `links`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Rules**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "Get Your Self To Know the Rules Of This Server Before You Can Do Anything!\nAnd Make Sure To get Yourself Some Roles To Know More About People And This Server"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields({
        name: "**Rule 2**",
        value:
          "\n**Language :** Please stick to English so we can understand you.",
        inline: false,
      })
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `termsandusage`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Terms and Usage**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "It is perfectly fine for anyone to use, modify and share our packs within their projects for the betterment of the community.\nHowever, you may only do so if it does not infringe on the following terms and conditions:"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields(
        {
          name: "**Section 1 - TermsAndUsage**",
          value: "\n────────────\n\n\n",
          inline: false,
        },
        {
          name: "\n\n**1.1**",
          value:
            "\n**You cannot redistribute our packs as they are, without proper modification and/or additions.**",
          inline: false,
        },
        {
          name: "\n**1.2**",
          value:
            "\n** You cannot restrict access or sell any pack that includes our packs through donations and/or a paywall.** ",
          inline: false,
        },
        {
          name: "\n**1.3**",
          value:
            "\n**You cannot distribute our packs without appropriate credit (refer to Section 2).**",
          inline: false,
        },
        {
          name: "\n**1.4**",
          value:
            "\n**You can distribute your pack, as long as your pack includes proper modification and/or additions.**",
          inline: false,
        },
        {
          name: "\n**1.5**",
          value:
            "\n**You can distribute your pack with our packs, as long as you have appropriately credited CraftYourWorld (refer to Section 2).** ",
          inline: false,
        },
        {
          name: "\n**1.6**",
          value:
            "\n**You can distribute your pack, as long as it is free to use for the community.**\n\n\n",
          inline: false,
        },
        {
          name: "\n\n\n**Section 2 - Credits**",
          value: "\n────────────",
          inline: false,
        },
        {
          name: "\n\n**2.1**",
          value:
            "\n**You must include the below text on all main publishing platforms that you may use. (Minecraft Forum, Planet Minecraft, Minecraft Maps, Curseforge, etc.).**",
          inline: false,
        },
        {
          name: "\n**2.2**",
          value:
            "\n**You must create a `credits.txt` within your project that includes the below text.**",
          inline: false,
        },
        {
          name: "\n\n**Credit.txt Format**",
          value: "```Credits:\n[website Yet To Come]```",
          inline: false,
        }
      )
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed });
  }
});

client.on("message", (message) => {
  if (message.content === `roles`) {
    message.delete();
    const embed = new Discord.MessageEmbed()
      .setColor("#0099ff")
      .setTitle("**CraftYourWorld Roles**")
      .setAuthor(
        "CraftYourWorld",
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .setDescription(
        "React To Your Desired Roles To Get More Information For Your Brain"
      )
      .setThumbnail(
        "https://cdn.discordapp.com/attachments/789839321616089099/796581890080374864/CraftYourWorld.png"
      )
      .addFields(
        {
          name: "**Vote For Your Roles**",
          value: "\n────────────\n\n\n",
          inline: false,
        },
        {
          name:
            "\n\n**<:Texturepacks:793404396556779552> Texturepack <:Texturepacks:793404396556779552>**",
          value: "\n**React To Get Updates About Our Resourcepacks**",
          inline: false,
        },
        {
          name:
            "\n**<:Datapacks:793404388177739786> Datapacks <:Datapacks:793404388177739786>**",
          value: "\n**React To Get Updates About Our Datapacks**",
          inline: false,
        },
        {
          name:
            "\n**<:MinecraftNews:793404396263309362> Minecraft News <:MinecraftNews:793404396263309362>**",
          value: "\n**React To Get Updates About Minecraft News**",
          inline: false,
        },
        {
          name:
            "\n**<:Optifine:793420433981833216> Optifine News <:Optifine:793420433981833216>**",
          value: "\n**React To Get Updates About Optifine News**",
          inline: false,
        },
        {
          name:
            "\n**<:Others:793422268247965707> Other Stuff <:Others:793422268247965707>**",
          value: "\n**React To Get Updates About Other News**",
          inline: false,
        },
        {
          name: "\n**:wave: Joining And leaving :wave:**",
          value: "\n**React To Get Updates About others Joining And leaving **",
          inline: false,
        }
      )
      .setTimestamp()
      .setFooter(`@CraftYourWorld`);
    message.channel.send({ embed }).then((reactionMessage) => {
      reactionMessage.react("<:Texturepacks:793404396556779552>");
      reactionMessage.react("<:Datapacks:793404388177739786>");
      reactionMessage.react("<:MinecraftNews:793404396263309362>");
      reactionMessage.react("<:Optifine:793420433981833216>");
      reactionMessage.react("<:Others:793422268247965707>");
      reactionMessage.react("👋");
    });
  }
});

client.on("messageReactionAdd", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild) return;

  if (reaction.message.id == "800579605559509032") {
    if (reaction.emoji.id == "793404396556779552") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793390193507696654");
    }
    if (reaction.emoji.id == "793404388177739786") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793389937671536681");
    }
    if (reaction.emoji.id == "793404396263309362") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("791929524996014110");
    }
    if (reaction.emoji.id == "793420433981833216") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793390200453726208");
    }
    if (reaction.emoji.id == "793422268247965707") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793390528954892289");
    }
    if (reaction.emoji.name == "👋") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.add("793410703653470218");
    }
  }
});

client.on("messageReactionRemove", async (reaction, user) => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (!reaction.message.guild) return;

  if (reaction.message.id == "800579605559509032") {
    if (reaction.emoji.id == "793404396556779552") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793390193507696654");
    }
    if (reaction.emoji.id == "793404388177739786") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793389937671536681");
    }
    if (reaction.emoji.id == "793404396263309362") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("791929524996014110");
    }
    if (reaction.emoji.id == "793420433981833216") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793390200453726208");
    }
    if (reaction.emoji.id == "793422268247965707") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793390528954892289");
    }
    if (reaction.emoji.name == "👋") {
      await reaction.message.guild.members.cache
        .get(user.id)
        .roles.remove("793410703653470218");
    }
  }
});

// Community-Creations To Community-Discussion!
client.on("message", (message) => {
  if (
    message.channel.id != process.env.creationschannelid || // the message is not in community creations
    message.author.id == client.user.id || // the message was sent my the bot
    message.attachments.array().length > 0 || // there is an attachment
    message.content.includes("http://") || // there is a link
    message.content.includes("https://") // there is a link
  )
    return;

  message.delete();
  message
    .reply({
      embed: {
        title: `your message was deleted because it didn't have an attachment, image or link. Please use #${process.env.discussionchannelid} for talking about creations posted in this channel.`,
      },
    })
    .then((response) => response.delete({ timeout: 5000 }));

  if (message.member.nickname == null) name = message.author.username;
  else name = message.member.nickname;

  const webhookUserData = {
    username: name,
    avatarURL: message.author.avatarURL({ dynamic: true }),
  };

  creationsWebhook.send(message.content, webhookUserData);
});

// Community Impression!
client.on("messageReactionAdd", async (reaction, _user) => {
  if (reaction.emoji.name == "⭐") {
    const message = reaction.message;
    const reactionData = message.reactions.cache.get("⭐");
    if (
      reactionData.count == 5 &&
      !reactionData.users.cache.has(client.user.id)
    ) {
      if (message.member.nickname == null) name = message.author.username;
      else name = `${message.member.nickname} (${message.author.username})`;
      message.react("⭐");
      const embed = {
        color: color,
        author: {
          name: name,
          icon_url: message.author.avatarURL(),
        },
        description: message.content,
        fields: [
          {
            name: "Original",
            value: `[Jump](${message.url})`,
          },
        ],
        footer: { text: "#" + message.channel.name },
      };
      if (message.attachments.size != 0)
        embed.image = {
          url: message.attachments.entries().next().value[1].attachment,
        };
      client.channels.cache.get("791635796431601715").send({ embed: embed });
    }
  }
});

//creations upload
client.on("messageReactionAdd", async (reaction, _user) => {
  if (reaction.emoji.name == "<:upvote:828127419331903498>") {
    const message = reaction.message;
    const reactionData = message.reactions.cache.get(
      "<:upvote:828127419331903498>"
    );
    if (
      reactionData.count == 2 &&
      !reactionData.users.cache.has(client.user.id)
    ) {
      if (message.member.nickname == null) name = message.author.username;
      else name = `${message.member.nickname} (${message.author.username})`;
      message.react("<:upvote:828127419331903498>");
      const embed = {
        color: color,
        author: {
          name: name,
          icon_url: message.author.avatarURL(),
        },
        description: message.content,
        fields: [
          {
            name: "Original",
            value: `[Jump](${message.url})`,
          },
        ],
        footer: `in # + ${message.channel.name} by @ + ${message.author.name}`,
      };
      if (message.attachments.size != 0)
        embed.image = {
          url: message.attachments.entries().next().value[1].attachment,
        };
      client.channels.cache.get("828126022909820998").send({ embed: embed });
    }
  }
});

// Join-Leave
client.on("guildMemberAdd", (member) =>
  client.channels.cache.get("789830758331318273").send({
    embed: {
      title: `\n📥 <@${member.tag}> joined the server. There are now \`${member.guild.memberCount}\` in the server \nWelcome <@${member.id}> :wave:`,
    },
  })
);

client.on("guildMemberRemove", (member) =>
  client.channels.cache.get("789830758331318273").send({
    embed: {
      title: `\n📤 <@${member.tag}> left the server. There are now \`${member.guild.memberCount}\` in the server \nwhat made them leave? :thinking:`,
    },
  })
);

client.on("message", (message) => {
  if (
    message.content.includes("discord.gg") ||
    message.content.includes("discord.com/invite")
  ) {
    message
      .delete()
      .then((message) =>
        message.reply({ embed: { title: "**Don't Send Invite Links!**" } })
      )
      .then((response) => response.delete({ timeout: 5000 }));
  }
});

client.on("message", (message) => {
  if (
    message.content.includes("fuck") ||
    message.content.includes("Fuck") ||
    message.content.includes("bitch") ||
    message.content.includes("Bitch") ||
    message.content.includes("Bitching") ||
    message.content.includes("bitching") ||
    message.content.includes("shit") ||
    message.content.includes("Shit") ||
    message.content.includes("ass") ||
    message.content.includes("Ass") ||
    message.content.includes("asshole") ||
    message.content.includes("Asshole") ||
    message.content.includes("fucking") ||
    message.content.includes("Fucking") ||
    message.content.includes("Stinky") ||
    message.content.includes("stinky")
  )
    message
      .delete()
      .then((message) =>
        message.channel.send({ embed: { title: "**Psst don't swear!**" } })
      )
      .then((response) => response.delete({ timeout: 5000 }));
});

client.on('ready', () => {
  console.log('The client is ready!')

  command(client, 'ban', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} That user has been`)
      } else {
        message.channel.send(`${tag} Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} That user has kicked`)
      } else {
        message.channel.send(`${tag} Please specify someone to kick.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })
})

// detect when a member joins or leaves a voice channel, and give them the role if applicable
client.on("voiceStateUpdate", (oldState, newState) => {
  if (oldState.member.user.bot) return;

  if (oldState.channelID != null && newState.channelID == null) {
    join = false;
    leave = true;
  } else if (oldState.channelID == null && newState.channelID != null) {
    join = true;
    leave = false;
  } else if (
    oldState.channelID != null &&
    newState.channelID != null &&
    oldState.channelID != newState.channelID
  ) {
    join = true;
    leave = true;
  } else return;

  if (leave) {
    if (
      newState.guild.me.voice.channelID != null &&
      newState.guild.me.voice.channel.members.filter(
        (member) => !member.user.bot
      ).size < 1
    )
      newState.guild.me.voice.channel.leave();

    if (oldState.channelID == "757326822936543332")
      newState.member.roles.remove(
        oldState.guild.roles.cache.get(inPublicVCRoleID)
      );
    else if (oldState.channelID == "806889275173109770")
      newState.member.roles.remove(
        oldState.guild.roles.cache.get(inLockedVCRoleID)
      );
  }

  if (join) {
    if (newState.channelID == "757326822936543332")
      newState.member.roles.add(
        oldState.guild.roles.cache.get(inPublicVCRoleID)
      );
    else if (newState.channelID == "806889275173109770")
      newState.member.roles.add(
        oldState.guild.roles.cache.get(inLockedVCRoleID)
      );
  }
});

client.on("message", async (message) => {
  if (!message.channel.name.startsWith("tts")) return; // not in tts text channel

  if (
    message.member.voice.channelID != null &&
    message.guild.me.voice.channelID == null
  )
    await message.member.voice.channel.join(); // join the channel if not already in a channel and the user is in a channel

  if (
    message.guild.me.voice.channelID != message.member.voice.channelID || // the bot and member are in different channels
    message.content.length > 100 || // the message is over 100 chars
    message.member.voice.channelID == null || // author is not in a vc in this server
    message.author.bot // author is a bot
  )
    return message.react("⚠️"); // let the user know it failed

  message.guild.voice.connection.play(
    discordTTS.getVoiceStream(
      `${
        message.member.nickname
          ? message.member.nickname
          : message.author.username
      } says ${message.cleanContent}`
    )
  ); // play

  message.react("✅"); // let the user know it worked
});

keepAlive();
client.login(process.env.bottoken);
