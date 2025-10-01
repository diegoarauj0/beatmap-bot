import { Event } from "@discord/types/event";
import discordClient from "@discord/index";

export default new Event({
	name: "interactionCreate",
	run(interaction) {
		if (interaction.isStringSelectMenu()) discordClient.selects.get(interaction.customId)?.(interaction);
		if (interaction.isModalSubmit()) discordClient.modals.get(interaction.customId)?.(interaction);
		if (interaction.isButton()) discordClient.buttons.get(interaction.customId)?.(interaction);
	},
});
