const { client } = require("../bot");

module.exports = {
  name: "die",
  description: "Stops the bot.",
  usage: "[Kill the bot]",
  availableTo: "789830986401185812",
  type: "admin",
  execute(message, args) {
    if (message.member.roles.cache.has("789830986401185812")) {
      message
        .react("👍")
        .then(() =>
          message.channel.send({
            embed: {
              title: "Shutting the bot down",
              description: `The bot has been shut down by ${message.author.tag}`,
            },
            color: "FF0000",
          })
        )
        .then(() => process.exit());
      var user = `${message.author.tag}`;
      console.log(`Bot has been stopped by ${user}`);
      console.log("CraftYourWorld Bot is Dead!");
      // moderator role id
    } else
      message
        .delete()
        .then(
          message.channel
            .send({
              embed: { title: "This command is only available to moderators." },
            })
            .then((message) => message.delete({ timeout: 10000 }))
        )
        .catch((error) => console.error(error));
  },
};
