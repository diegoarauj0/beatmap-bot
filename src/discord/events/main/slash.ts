import { CommandInteractionOptionResolver } from "discord.js";
import { Event } from "@discord/types/event";
import discordClient from "@discord/index";

export default new Event({
	name: "interactionCreate",
	run(interaction) {
		if (!interaction.isCommand()) return;

		const command = discordClient.commands.get(interaction.commandName);
		if (!command) return;

		const options = (interaction as { options: unknown }).options as CommandInteractionOptionResolver;

		command.run({
			client: discordClient,
			interaction,
			options,
		});
	},
});
