import { DiscordClient } from "@discord/client";

const TOKEN = process.env.DISCORD_TOKEN;

const discordClient = new DiscordClient();

discordClient.start(TOKEN);

export default discordClient