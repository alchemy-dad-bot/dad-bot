/* eslint-disable no-console */
const { Client, GatewayIntentBits } = require('discord.js');
const { init } = require('./giphy-command');
const dotenv = require('dotenv');
const { getGifs } = require('../../data/giphy-API');
dotenv.config();

/*
To access with node --> node Giphy/giphy-index.js
*/ 


const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  init();
  console.log('Ready from giphy-index.js');
});


client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === 'dad-gif') {
    const gifResult = await getGifs();
    await interaction.reply(gifResult.data.url);
  }
});

client.login(process.env.DISCORD_TOKEN);
