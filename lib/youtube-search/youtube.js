const { Client, GatewayIntentBits } = require('discord.js');
const { getDadHelp } = require('../../data/youtube-data');
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on('ready', () => console.log('Youtube.js logged in.'));
client.on('message', async message => {
  if(message.content.toLowerCase() === '!dad-help') {
    const embed = new Client.RichEmbed()
      .setColor('#73ffdc')
      .setDescription('Please enter a search query. Remember to narrow down your search.')
      .setTitle('YouTube Search API');
    await message.channel.send(embed);
    const filter = m => m.author.id === message.author.id;
    const query = await message.channel.awaitMessages(filter, { max: 1 });
    const results = await getDadHelp(query) //API fetch on this line?
      .catch(err => console.log(err));   
    if (results) {
      const youtubeResults = results.results;
      let i = 0;
      const titles = youtubeResults.map(result => {
        i++;
        return i + ') ' + result.title;
      });
      console.log('titles', titles);
      message.channel.send({
        embed: {
          title: 'Select which topic you need help with by typing the number',
          description: titles.join('\n')
        }
      }).catch(err => console.log(err));

      const filter = m => (m.author.id === message.author.id) && 
        m.content >= 1 && m.content <= youtubeResults.length;
      const collected = await message.channel.awaitMessages(filter, { maxMatches: 1 });
      const selected = youtubeResults[collected.first().content - 1];

      const embed = new Client.RichEmbed()
        .setTitle(`${selected.title}`)
        .setURL(`${selected.link}`)
        .setDescription(`${selected.description}`)
        .setThumbnail(`${selected.thumbnails.default.url}`);

      message.channel.send(embed);
    } 
  } 
});

client.login(process.env.DISCORD_TOKEN);
