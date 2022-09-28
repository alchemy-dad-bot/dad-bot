module.exports = function registerDadJokeCommands(client) {
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
      // the second argument to .map is the index
      // also think about how you may improve this with a .reduce :)
      const jokeMap = jokeList.map((joke, i) => {      
        return i + ') ' + joke.content;
      });
      const jokes = jokeMap.join('\n');
      interaction.reply(jokes);
      
    } else if (commandName === 'my-jokes-random') {
      const joke = await User.getRandomJoke({ user_id: interaction.user.id });
      interaction.reply(joke.content);
  
    } else if (commandName === 'get-dads') {
      const dads = await Creator.getCreators();
      // i haven't check this works, but you should be able to generate your array with a .map
      const dadResponse = dads.map((dad)=>({title: dad.name, image: {url: dad.image_id}, url: dad.github, description: `[My Github](${dad.github})`}))
      interaction.reply({ 
        content: 
        `
        
        `, embeds: dadResponse
      });
    }
  });
}