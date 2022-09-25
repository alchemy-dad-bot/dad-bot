/* eslint-disable no-console */
const { init } = require('./lib/commands/init');
const registerDadJokeCommands = require('./lib/commands/dadJokes');
const registerYouTubeCommands = require('./lib/commands/youtube');

const dotenv = require('dotenv');
dotenv.config();

const client = require('./lib/services/client')

client.once('ready', () => {
  init();
  console.log('Ready from index.js');
  client.channels.cache.get(process.env.CHANNEL_ID).send('I am online!');
});

registerDadJokeCommands(client);
registerYouTubeCommands(client)


client.login(process.env.DISCORD_TOKEN);
