/* eslint-disable no-console */
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv');
dotenv.config();

const commands = [
  new SlashCommandBuilder().setName('dad-gif').setDescription('Gets a random dad gif'),
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
    console.log('Started refreshing application (/) commands for giphy file.');
  } catch (e) {
    console.error(e);
  }
};
