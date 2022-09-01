/* eslint-disable no-console */
const { Client, GatewayIntentBits } = require('discord.js');
const { init } = require('../../commands');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  init();
  console.log('Ready from Delete/index.js');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'delete-joke') {
    const deleteJoke = await User.deleteUserJoke({ 
      id: interaction.id });
    console.log('line 75', deleteJoke);
    interaction.reply(deleteJoke);
  }
});

client.login(process.env.DISCORD_TOKEN);

