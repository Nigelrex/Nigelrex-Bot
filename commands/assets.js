const {client} = require("../bot");
const {color} = require("../config.json");

module.exports = {
	name: `assets`,
	aliases: ["getassets", "vanillassets", "defaultassets"],
	description: "Get a link to the default Minecraft assets for a particular version.",
	usage: "[version]",
	availableTo: "@everyone",
    execute(message, args) {
        if (!args[0]) message.reply({embed:{title:"You need to provide a version!", color:color}})
        else{
		message.reply({embed:{title:`Browse the assets for version ${args[0]}: <https://github.com/InventivetalentDev/minecraft-assets/tree/${encodeURI(args[0])}>\nDirect download link: https://github.com/InventivetalentDev/minecraft-assets/archive/${encodeURI(args[0])}.zip\nNote: these links will not work correctly if an invalid version was specified.`, color:color}})
    }},
    
};