module.exports = {
	name: 'creators',
	description: 'Creators info!',
	execute(message, args) {
		message.channel.send({embed:{title:'This Server was created and maintained by Nigelrex And TheOtherAnxxity.'}});
	},
};