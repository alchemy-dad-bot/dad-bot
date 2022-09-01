/* eslint-disable no-console */
const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const dotenv = require('dotenv');
dotenv.config();

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
  new SlashCommandBuilder().setName('dad-joke').setDescription('Replies with a random joke'),
  new SlashCommandBuilder().setName('search-joke')
    .setDescription('Search for a joke with a specific term')
    .addStringOption(option => 
      option.setName('term')
        .setDescription('Gimme a topic, bud!')
        .setRequired(true)),
  new SlashCommandBuilder().setName('add-joke')
    .setDescription('Add your own dad joke')
    .addStringOption(option => 
      option.setName('input')
        .setDescription('Give it a shot!')
        .setRequired(true)),
  new SlashCommandBuilder().setName('my-jokes-random').setDescription('Get a random joke you made'),
  new SlashCommandBuilder().setName('my-jokes').setDescription('A list of jokes you made'), 
  new SlashCommandBuilder().setName('get-dads').setDescription('A list of dads'),
  new SlashCommandBuilder().setName('dad-gif').setDescription('Gets a random dad gif'),
  new SlashCommandBuilder().setName('delete-joke').setDescription('Deletes a user joke') // Currently Working on
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

