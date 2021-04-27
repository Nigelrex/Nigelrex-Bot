module.exports = {
  name: "clear",
  aliases: ["purge", "bulkdelete"],
  description: "Delete a certain number of messages.",
  usage: "[number of messges to delete]",
  availableTo: "<&789830986401185812>",
  type: "admin",
  execute(message, args) {
    if (
      !message.member.roles.cache.some(
        (role) => role.id == "789830986401185812"
      )
    )
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
    else if (args[0] == undefined)
      message
        .delete()
        .then(
          message.channel
            .send({
              embed: {
                title:
                  "You need to specify how many messages you want to delete.",
              },
            })
            .then((message) => message.delete({ timeout: 10000 }))
        )
        .catch((error) => console.error(error));
    else
      message.channel
        .bulkDelete(Number(args[0]) + 1)
        .then(
          message.channel
            .send({ embed: { title: `🚫 Deleted ${args[0]} messages.`, color:"FF0000" } })
            .then((message) => message.delete({ timeout: 3000 }))
        )
        .catch((error) => console.error(error));
  },
};
