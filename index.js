/* eslint-disable no-console */
const { Client, GatewayIntentBits } = require('discord.js');
const { init } = require('./commands');
const dotenv = require('dotenv');
// const fetch = require('cross-fetch');
const { getDadJokes } = require('./data/dad-jokes-data');
const User = require('./lib/models/User');
const Creator = require('./lib/models/Creator');
dotenv.config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  init();
  console.log('Ready from index.js');
});

// async function getJSONresponse(body) {
//   let fullBody = '';

//   for await (const data of body) {
//     fullBody += data.toString();
//   }
//   const dad = await getDadJokes();
//   console.log(dad);
//   return JSON.parse(fullBody);
// }

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply(
      `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
    );
  } else if (commandName === 'user') {
    await interaction.reply('User info.');
    // Start custom dad commands
  } else if (commandName === 'dad-joke') {
    const jokeResult = await getDadJokes();
    interaction.reply(jokeResult.joke);

    // add dad joke
  } else if (commandName === 'add-joke') {
    await User.insert({
      user_id: interaction.user.id,
      content: interaction.options._hoistedOptions[0].value,
    });
    await interaction.reply({ content: 'Good one Kiddo!', ephemeral: true });
  } else if (commandName === 'my-jokes') {
    const joke = await User.getRandomJoke({ user_id: interaction.user.id });
    interaction.reply(joke.content);
    console.log('random user created joke', joke);
    console.log(interaction.reply);
  } else if (commandName === 'get-dads') {
    const dad = await Creator.getCreators();
    interaction.reply({ 
      content: 
      `
      ${ dad[0].name }, ${ dad[0].linkedin}, ${dad[0].github},
      ${ dad[1].name }, ${ dad[1].linkedin}, ${dad[1].github},
      ${ dad[2].name }, ${ dad[2].linkedin}, ${dad[2].github},
      ${ dad[3].name }, ${ dad[3].linkedin}, ${dad[3].github}
      `
    });
  }
  else if (commandName === 'delete-joke') {
    const deleteJoke = await User.deleteUserJoke({ 
      id: interaction.id });
    console.log('line 75', deleteJoke);
    interaction.reply(deleteJoke);
  }
});

// console.log('client', client);

client.login(process.env.DISCORD_TOKEN);
