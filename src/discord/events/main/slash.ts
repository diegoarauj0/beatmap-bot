import { CommandInteractionOptionResolver, MessageFlags } from "discord.js";
import { ErrorEmbed } from "@discord/embeds/error";
import { Event } from "@discord/types/event";
import discordClient from "@discord/index";
import i18next from "@config/i18next";

export default new Event({
	name: "interactionCreate",
	run(interaction) {
		if (!interaction.isCommand()) return;

		const command = discordClient.commands.get(interaction.commandName);
		if (!command) return;

		const options = (interaction as { options: unknown }).options as CommandInteractionOptionResolver;

		try {
			i18next().then((v) => {
				command.run({
					client: discordClient,
					interaction,
					options,
					i18next: v
				});
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
