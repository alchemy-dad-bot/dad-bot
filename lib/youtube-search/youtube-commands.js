/* eslint-disable no-console */
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv');
dotenv.config();

const commands = [
  new SlashCommandBuilder()
    .setName('dad-help')
    .setDescription('Return a youtube video to help you fix things')
    .addStringOption(option => 
      option
        .setName('query')
        .setDescription('Search for a topic you need DadBot\'s')
        .setRequired(true))
]
  .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(
  process.env.DISCORD_TOKEN
);

module.exports.init = async () => {
  try {
    await rest.put(Routes.applicationCommands(process.env.APP_ID), {
      body: commands 
    });
    console.log('Started refreshing application (/) commands.');
  } catch (e) {
    console.error(e);
  }
};
