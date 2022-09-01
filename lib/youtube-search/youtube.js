const { Client, GatewayIntentBits, EmbedBuilder, MessageCollector, Embed } = require('discord.js');
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
// When the client turns on, it will listen for a message to be created
client.on('messageCreate', async (message) => {
  // If the author of the message is a bot, it will ignore the message
  // prevents responding to itself or an infinite loop
  if (message.author.bot) return;

  // convert the message to all lowercase, and match it against the assigned command
  if (message.content.toLowerCase() === '!dad-help') {
    // on receiving the command, send a message to the channel
    message.channel.send({ 
      embeds: [
        new EmbedBuilder()
          .setDescription('Tell me what you need help with, sport.')
      ] 
    });
    // Set a filter for the messageCollector, so that only one user can interact with the bot
    const filter = (m) => m.author.id === message.author.id;
    // Parameters for the messageCollector requires a channel and filter and limit
    // the collector to only receive one message
    const collector = message.channel.createMessageCollector(message.channel, filter, {
      max: 1, 
      time: 10000
    });
    collector.on('collect', async (msg) => {
      console.log('collector on line 43', collector);
      if(msg.author.bot) return;
      console.log('msg.content', msg.content);

      // take the message content, and send it through our fetch function
      // using the message content as the search parameter
      const results = await getDadHelp(msg.content)
        .catch(err => console.error(err));
      if (results) {
        // results should come back as a results object containing an item object of nested results
    
        const youtubeResults = results.items;
        // Map through the results array, assigning the index of each result to a number
        let i = 0;
        const titles = youtubeResults.map(result => {
          i++;
          return i + ') ' + result.snippet.title;
        });
        // join the array of titles, placing each indexed title on its own line
        const resultList = titles.join('\n');
        await message.channel.send({
          embeds: 
                [{ 
                  title: 'Select which topic you need help with by typing the number',
                  description: resultList 
                }]
        })
          .catch(err => console.log(err));
          
        collector.stop('end', collected => {
          console.log(`Collected on line 72 ${collected.content}`);
        });
            
        // set a new filter for the next message collector allowing only the user who typed the original command
        // can continue interacting with the bot
        const filter = m => (m.user.id === msg.user.id) && 
                m.content >= 1 && m.content <= youtubeResults.length;
        const collector2 =  msg.channel.createMessageCollector(msg.channel, filter, {
          max: 1, 
          time: 10000
        });
        collector2.on('collect', async (number) => {
          console.log('collector2 on line 84', collector2);
          if (number.author.bot) return;
        
          const selected = number.content;
          const youtubeVideo = await youtubeResults[selected - 1];
          console.log('youtubeVideo line 73', youtubeVideo);
          //   console.log('Does this correctly access the thumbnail?', youtubeVideo.snippet);
          //   [collected.first().content - 1];
          
          //   const embed = ;
            
          message.channel.send({ embeds: [new EmbedBuilder()
            .setTitle(`${youtubeVideo.snippet.title}`)
            .setURL(`https://www.youtube.com/watch?v=${youtubeVideo.id.videoId}`)
            .setDescription(`${youtubeVideo.snippet.description}`)
            .setThumbnail(`${youtubeVideo.snippet.thumbnails.default.url}`)] });
        });
        collector2.on('end', collected2 => {
          console.log(`Collected2 on line 102 ${collected2.content}`);
        });
      }
    });
    // console.log('MessageCollector line 78', MessageCollector);
    // // console.log('results', results.items);
    // console.log('message from line 84', message);

    // set a filter so that only the user who typed the command 
    // can choose from the continued options

  } 
} 
  // collector.on('collect', (message) => {
  //   console.log('message.content', message.content);
  // });
);
  
//   if (!interaction.isChatInputCommand()) return;
//   const { commandName } = interaction;

//   if(commandName === 'dad-help') {

    
//     const embed = new EmbedBuilder()
//       .setColor('#73ffdc')
//       .setDescription('Tell DadBot what topic you need help with.')
//       .setTitle('YouTube Search API');
      
//     // console.log('embed', embed);
//     // interaction.reply({ embeds: [embed], ephemeral: true });
//     // set the
//     console.log('interaction.options.getString()', interaction.options);
//     const query = interaction.options.getString('query');
//     console.log('Is the query making it to the function?', query);

//     // const results = await getDadHelp(query)
//     const results = await getDadHelp(query)
//       .catch(err => console.log(err));   
//     console.log('results', results.items);
//     if (results) {
//       // results should come back as an object containing an object of nested results

//       const youtubeResults = results.items;
//       // Map through the results array, assigning the index of each result to a number
//       //   console.log('youtubeResults', youtubeResults);
//       let i = 0;
//       const titles = youtubeResults.map(result => {
//         i++;
//         return i + ') ' + result.snippet.title;
//       });
//       console.log('titles', titles);
//       console.log('titles.join', titles.join('\n'));
//       const resultList = titles.join('\n');
//       await interaction.reply({
//         embeds: 
//           [{ title: 'Select which topic you need help with by typing the number',
//             description: resultList }]
        
//       }).catch(err => console.log(err));
//       console.log('interaction', interaction);

//       // set a filter so that only the user who typed the command 
//       // can choose from the continued options

//       const filter = m => (m.user.id === interaction.user.id) && 
//           m.content >= 1 && m.content <= youtubeResults.length;
//       console.log('filter', filter);
//       const collected = await interaction.channel.awaitMessages(filter, { maxMatches: 1 });
//       console.log('collected', collected);
//       const selected = youtubeResults[collected.first().content - 1];

//       const embed = new EmbedBuilder()
//         .setTitle(`${selected.title}`)
//         .setURL(`${selected.link}`)
//         .setDescription(`${selected.description}`)
//         .setThumbnail(`${selected.thumbnails.default.url}`);

//       interaction.channel.send({ embeds: [embed] });
//     } 
//   } 
// });

client.login(process.env.DISCORD_TOKEN);
