module.exports.getColorFromGuild = guild => {
	if (guild.me.displayColor)
		return guild.me.displayColor
	else
		return 'e74c3c'
}

module.exports.getColorFromChannel = channel => {
	if (channel.guild)
		return module.exports.getColorFromGuild(channel.guild)
	else
		return 'e74c3c'
}

module.exports.getColorFromMessage = message => {
	return module.exports.getColorFromChannel(message.channel)
}