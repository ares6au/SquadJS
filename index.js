/* Dependency Imports */
const Discord = require('discord.js');
const client = new Discord.Client();

/* SquadJS Imports */
const src = process.env.NODE_ENV === 'production' ? './build' : './src';
const SquadServer = require(src).SquadServer;

/* SquadJS Plugin Imports */
const TickTest = require(src).TickTest;
const SeedingMessage = require(src).SeedingMessage;
const DiscordStatusMessage = require(src).DiscordStatusMessage;
const LayerSelector = require(src).LayerSelector;
const DiscordLayerVote = require(src).DiscordLayerVote;

/* Server Configuration */
const TestServer = new SquadServer(
  'xxx.xxx.xxx.xxx',
  27175,
  21124,
  'rconpassword'
);

/* Plugin Configuration */
const tickTest = new TickTest();
const seedingMessage = new SeedingMessage();
const statusMessage = new DiscordStatusMessage(
  client,
  'channelID',
  'messageID'
);
const layerSelector = new LayerSelector();
const discordLayerVote = new DiscordLayerVote(TestServer, client, 'channelID');

/* Apply Plugins */
TestServer.addTickBasedPlugin(tickTest);
TestServer.addTickBasedPlugin(seedingMessage);
TestServer.addTickBasedPlugin(statusMessage);
TestServer.addTickBasedPlugin(layerSelector);
TestServer.addTickBasedPlugin(discordLayerVote);

/* Boot SquadJS */
client.on('ready', () => {
  console.log('Discord Client ready.... Starting SquadJS...');

  // Place servers here.
  TestServer.run();
});

// Place your Discord Bot token here.
client.login('discord-login-token');
