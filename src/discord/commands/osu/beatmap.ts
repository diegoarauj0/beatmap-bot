import { IFindBeatmapUseCase } from "@app/beatmap/contracts/useCases/findBeatmap.useCase";
import { ApplicationCommandOptionType, ApplicationCommandType, MessageFlags } from "discord.js";
import { BaseCommand, CommandProps } from "@discord/types/command";
import { BeatmapEmbed } from "@discord/embeds/beatmap";
import { injectable, inject } from "tsyringe";
import { ErrorEmbed } from "@discord/embeds/error";

@injectable()
export default class FindBeatmap extends BaseCommand {
	constructor(@inject("IFindBeatmapUseCase") private findBeatmapUseCase: IFindBeatmapUseCase) {
		super({
			name: "beatmap",
			description: "search beatmap",
			type: ApplicationCommandType.ChatInput,
			options: [
				{
					name: "beatmap_id",
					required: true,
					description: "beatmap id",
					type: ApplicationCommandOptionType.Number,
				},
			],
		});
	}

	public run = async ({ interaction, options }: CommandProps): Promise<void> => {
		const beatmapExtended = await this.findBeatmapUseCase.findBeatmap(options.getNumber("beatmap_id", true));

		if (beatmapExtended === null) {
			interaction.reply({ embeds: [ErrorEmbed.notFoundEmbedBuilder("beatmap")], flags: MessageFlags.Ephemeral });
			return 
		}

		const beatmapEmbed = BeatmapEmbed.beatmapEmbedBuilder(beatmapExtended);

		interaction.reply({ embeds: [beatmapEmbed] });
	};
}
