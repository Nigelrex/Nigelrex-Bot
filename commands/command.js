const { client } = require('../bot.js')
const { getColorFromMessage } = require('./color.js')
const { defaultPrefix } = require('./botconfig.js')
const { ownerIDs } = require('./botconfig.js')

module.exports.Command = class {

	constructor(commandOptions) {
		this.name = commandOptions.name
		commandOptions.description ? this.description = commandOptions.description : this.description = ''
		commandOptions.usage ? this.usage = commandOptions.usage : this.usage = ''
		commandOptions.usageDescription ? this.usageDescription = commandOptions.usageDescription : this.usageDescription = ''
		commandOptions.permissions ? this.permissions = commandOptions.permissions : this.permissions = null
		commandOptions.aliases ? this.aliases = commandOptions.aliases : this.aliases = []
		commandOptions.guildOnly ? this.guildOnly = commandOptions.guildOnly : this.guildOnly = false
		commandOptions.ownerOnly ? this.ownerOnly = commandOptions.ownerOnly : this.ownerOnly = false
		commandOptions.minNumberOfArgsRequired ? this.minNumberOfArgsRequired = commandOptions.minNumberOfArgsRequired : this.minNumberOfArgsRequired = 0
		this.runCode = commandOptions.runCode
	}

	run = (message, command, args, splitArgs) => {

		if (message.guild && !message.guild.me.hasPermission('ADMINISTRATOR'))
			return message.reply({ embed: {
				color: getColorFromMessage(message),
				title: 'Missing Bot Permissions',
				description: `The bot must be an administrator for to work on servers. Please give the bot administrator permissions to use.`
			}})

		if (this.guildOnly && !message.guild)
			return message.reply({ embed: {
				color: getColorFromMessage(message),
				title: 'Guild Only Command',
				description: `This command only works in servers, not in Direct Messages.`
			}})

		if (this.ownerOnly && !ownerIDs.includes(message.author.id))
			return message.reply({ embed: {
				color: getColorFromMessage(message),
				title: 'Owner Only Command',
				description: `This command is only available to owners of the bot.`
			}})

		if (this.permissions && !message.member.hasPermission(this.permissions)) 
			return message.reply({ embed: {
				color: getColorFromMessage(message),
				title: 'Missing Permissions',
				description: `You don't have permission to run that command!\nThe following permissions are required: \`${this.listPermissions()}\``
			}})

		if (this.minNumberOfArgsRequired > splitArgs.length)
			return this.sendArgsError(message)
		
		this.runCode(message, command, args, splitArgs)
	}

	getFullUsage = guild => {
		if (guild)
			return `${client.settings.get(guild.id, 'prefix')}${this.name} ${this.usage}`
		else
			return `${defaultPrefix}${this.name} ${this.usage}`
	}

	sendArgsError = message => {
		message.reply({ embed: {
			color: getColorFromMessage(message),
			title: 'Missing Argument',
			description: `Usage: \`${this.getFullUsage(message.guild)}\``
		}})
	}

	listPermissions = () => typeof this.permissions == 'object' ? this.permissions.join(', ') : this.permissions.toString()

}