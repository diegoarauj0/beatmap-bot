import { ApplicationCommandOptionType, ApplicationCommandType, MessageFlags } from "discord.js";
import { IFindBeatmapUseCase } from "@app/beatmap/contracts/useCases/findBeatmap.useCase";
import { BaseCommand, CommandProps } from "@discord/types/command";
import { BeatmapEmbed } from "@discord/embeds/beatmap";
import { injectable, inject } from "tsyringe";

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
		const beatmap = await this.findBeatmapUseCase.findBeatmap(options.getNumber("beatmap_id", true));

		const embed = new BeatmapEmbed(beatmap)

		interaction.reply({ embeds: [embed], flags: beatmap === null ? MessageFlags.Ephemeral : undefined });
	};
}
