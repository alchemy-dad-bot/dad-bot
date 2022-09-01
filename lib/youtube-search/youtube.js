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
    const collector = new MessageCollector(message.channel, filter, {
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
        const collector2 =  new MessageCollector(msg.channel, filter, {
          max: 1, 
          time: 10000
        });
        collector2.on('collect', async (number) => {
          console.log('collector2 on line 84', collector2);
          if (number.author.bot) return;
        
          const selected = number.content;
          if (selected > titles.length || Number.isNaN(selected)) throw Error('That number is not an option');
          const youtubeVideo = await youtubeResults[selected - 1];
          console.log('youtubeVideo line 73', youtubeVideo);
          //   console.log('Does this correctly access the thumbnail?', youtubeVideo.snippet);
            
          message.channel.send({ embeds: [new EmbedBuilder()
            .setTitle(`${youtubeVideo.snippet.title}`)
            .setURL(`https://www.youtube.com/watch?v=${youtubeVideo.id.videoId}`)
            .setDescription(`${youtubeVideo.snippet.description}`)
            .setThumbnail(`${youtubeVideo.snippet.thumbnails.default.url}`)] });
          collector2.stop();
        });
      }
    });
  } 
} 
);


client.login(process.env.DISCORD_TOKEN);
