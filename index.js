const { Client, GatewayIntentBits, userMention } = require('discord.js');
const { init } = require('./commands');
const dotenv = require('dotenv');
const fetch = require('cross-fetch');
const { getDadJokes } = require('./data/dad-jokes-data');
const User = require('./lib/models/User');
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
    console.log(interaction.reply);
  }
});

// console.log('client', client);

client.login(process.env.DISCORD_TOKEN);
