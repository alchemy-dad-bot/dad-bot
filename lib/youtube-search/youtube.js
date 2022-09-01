const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { getDadHelp } = require('../../data/youtube-data');
const dotenv = require('dotenv');
const { init } = require('./youtube-commands');
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => {
  init();
  console.log('Youtube.js logged in.');
});
client.on('interactionCreate', async (interaction) => {
  console.log('message', interaction.options.getString());
  
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;

  if(commandName === 'dad-help') {

    
    // const embed = new EmbedBuilder()
    //   .setColor('#73ffdc')
    //   .setDescription('Tell DadBot what topic you need help with.')
    //   .setTitle('YouTube Search API');
      
    // console.log('embed', embed);
    // interaction.reply({ embeds: [embed], ephemeral: true });
    // set the
    console.log('interaction.options.getString()', interaction.options);
    const query = interaction.options.getString('query');
    console.log('Is the query making it to the function?', query);

    // const results = await getDadHelp(query)
    const results = await getDadHelp(query)
      .catch(err => console.log(err));   
    console.log('results', results.items);
    if (results) {
      // results should come back as an object containing an object of nested results

      const youtubeResults = results.items;
      // Map through the results array, assigning the index of each result to a number
      console.log('youtubeResults', youtubeResults);
      let i = 0;
      const titles = youtubeResults.map(result => {
        i++;
        return i + ') ' + result.snippet.title;
      });
      console.log('titles', titles);
      console.log('titles.join', titles.join('\n'));
      const resultList = titles.join('\n');
      await interaction.reply({
        embeds: 
          [{ title: 'Select which topic you need help with by typing the number',
            description: resultList }]
        
      }).catch(err => console.log(err));
      console.log('interaction', interaction);

      // set a filter so that only the user who typed the command 
      // can choose from the continued options

      const filter = i => (i.author.id === interaction.author.id) && 
          i.content >= 1 && i.content <= youtubeResults.length;
      const collected = await interaction.channel.awaitMessages(filter, { maxMatches: 1 });
      const selected = youtubeResults[collected.first().content - 1];

      const embed = new EmbedBuilder()
        .setTitle(`${selected.title}`)
        .setURL(`${selected.link}`)
        .setDescription(`${selected.description}`)
        .setThumbnail(`${selected.thumbnails.default.url}`);

      interaction.channel.send({ embeds: [embed] });
    } 
  } 
});

client.login(process.env.DISCORD_TOKEN);
