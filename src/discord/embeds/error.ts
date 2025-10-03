import { EmbedBuilder } from "discord.js";

export class ErrorEmbed {
	static notFoundEmbedBuilder(name: string): EmbedBuilder {
		const embed = new EmbedBuilder()
			.setTitle("❌ Not Found! ❌ ")
			.setDescription(`This ${name} was not found`)
			.setColor("Red")
			.setTimestamp();

		return embed;
	}

	static internalServerErrorEmbedBuilder(): EmbedBuilder {
		const embed = new EmbedBuilder()
			.setTitle("❌ Unknown error! ❌ ")
			.setDescription("An unknown error has occurred. Please try again.")
			.setColor("Red")
			.setTimestamp();

		return embed;
	}
}
