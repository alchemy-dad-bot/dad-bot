/* eslint-disable no-console */
const { Client, GatewayIntentBits } = require('discord.js');
const { getDadJokes, searchDadJokes } = require('./data/dad-jokes-data');
const { getGifs } = require('./data/giphy-API');
const { init } = require('./commands');
const User = require('./lib/models/User');
const Creator = require('./lib/models/Creator');
const dotenv = require('dotenv');
dotenv.config();

require('./lib/youtube-search/youtube');
 
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', () => {
  init();
  console.log('Ready from index.js');
  client.channels.cache.get(process.env.CHANNEL_ID).send('I am online!');
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
  } else if (commandName === 'user') {
    await interaction.reply('User info.');

    // Start custom dad commands
  } else if (commandName === 'dad-joke') {
    const jokeResult = await getDadJokes();
    interaction.reply(jokeResult.joke);

  } else if(commandName === 'search-joke') { 
    const jokes = await searchDadJokes(interaction.options._hoistedOptions[0].value);
    await interaction.reply(jokes.results[Math.floor(Math.random() * jokes.results.length)].joke);

  } else if (commandName === 'add-joke') {
    await User.insert({
      user_id: interaction.user.id,
      content: interaction.options._hoistedOptions[0].value,
    });
    await interaction.reply({ content: 'Good one Kiddo!', ephemeral: true });
    // get GIF commands
  } else if (commandName === 'dad-gif') {
    const gifResult = await getGifs();
    await interaction.reply(gifResult.data.url);
  
    // Get data from SQL tables
  } else if (commandName === 'my-jokes') {
    const jokeList = await User.getAllUserJokes({ user_id: interaction.user.id });
    let i = 0;
    const jokeMap = jokeList.map((joke) => {
      i++;
      return i + ') ' + joke.content;
    });
    const jokes = jokeMap.join('\n');
    interaction.reply(jokes);
    
  } else if (commandName === 'my-jokes-random') {
    const joke = await User.getRandomJoke({ user_id: interaction.user.id });
    interaction.reply(joke.content);

  } else if (commandName === 'get-dads') {
    const dad = await Creator.getCreators();
    interaction.reply({ 
      content: 
      `
      
      `, 'embeds': [
        {
          title: 'Alejandra',
          image: {
            url: `${dad[0].image_id}`
          },
          url: `${dad[0].github}`,
          description: '[My Github](https://github.com/Alejae1998)',
        },
        {
          title: 'Austin',
          image: {
            url: `${dad[1].image_id}`
          },
          url: `${dad[1].github}`,
          description: '[My Github](https://github.com/austinbhan)',
        }, 
        {
          title: 'Olivia',
          image: {
            url: `${dad[2].image_id}`
          },
          url: `${dad[2].github}`,
          description: '[My Github](https://github.com/Olivia-Pasion)',
        },
        {
          title: 'Brien',
          image: {
            url: `${dad[3].image_id}`
          },
          url: `${dad[3].github}`,
          description: '[My Github](https://github.com/briensthomas)',
        }
      ]
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
