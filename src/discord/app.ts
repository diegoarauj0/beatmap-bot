import { Client, Events, GatewayIntentBits } from "discord.js";

const isDev = process.env.NODE_ENV === "development";
const client = new Client({ intents: [GatewayIntentBits.MessageContent] });

client.on(Events.ClientReady, (client) => {
	console.log(`isDev: ${isDev ? "✅" : "❌"}`);
	console.log(`Logged in as: ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === "ping") {
		await interaction.reply("Pong!");
	}
});

export default client;
