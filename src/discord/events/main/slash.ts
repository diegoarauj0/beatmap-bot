import { CommandInteractionOptionResolver, MessageFlags } from "discord.js";
import { Event } from "@discord/types/event";
import discordClient from "@discord/index";
import { ErrorEmbed } from "@discord/embeds/error";

export default new Event({
	name: "interactionCreate",
	run(interaction) {
		if (!interaction.isCommand()) return;

		const command = discordClient.commands.get(interaction.commandName);
		if (!command) return;

		const options = (interaction as { options: unknown }).options as CommandInteractionOptionResolver;

		try {
			command.run({
				client: discordClient,
				interaction,
				options,
			});
		} catch (err) {
			console.error(err);
			interaction.reply({
				embeds: [ErrorEmbed.internalServerErrorEmbedBuilder()],
				flags: MessageFlags.Ephemeral,
			});
		}
	},
});
