const express = require('express');
const { Client, GateWayIntentBits } = require('discord.js');

const client = new Client({ intents: [GateWayIntentBits.Guilds] });

client.once('ready', () => {
  console.log('Ready from app.js');
});

client.login(process.env.DISCORD_TOKEN);

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/dadjokes', require('./controllers/dad-jokes'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

