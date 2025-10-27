
require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

// Helpful debug removed: don't print tokens or env contents to console.
const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error('Error: BOT_TOKEN is not defined in the environment. Create a .env from .env.example or set the BOT_TOKEN environment variable.');
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Logged in as ${readyClient.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author?.bot) return; // ignore other bots

  message.reply({
    content: 'Hello! I am a bot that responds to "ping" with "Pong!"',
  })

  if (message.content === 'ping') {
    await message.channel.send('Pong!');
  }
});

// client.on(Events.ClientReady, readyClient => {
//   console.log(`Logged in as ${readyClient.user.tag}!`);
// });

client.on("interactionCreate", async interaction => {
    console.log('Interaction received:', interaction);
    interaction.reply('Interaction received!');
});

client.login(TOKEN);