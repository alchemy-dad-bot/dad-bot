const { Client, GatewayIntentBits } = require('discord.js');
const { init } = require('./commands');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds] });

client.once('ready', () => {
  init();
  console.log('Ready from index.js');
});


client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return ;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  } else if (commandName === 'user') {
    await interaction.reply('User info.');
  }
});
// console.log('client', client);

client.login(process.env.DISCORD_TOKEN);
