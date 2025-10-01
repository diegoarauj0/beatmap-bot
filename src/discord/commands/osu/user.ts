import { ApplicationCommandOptionType, ApplicationCommandType, MessageFlags } from "discord.js";
import { OsuClientRuleset } from "@app/shared/contracts/services/osuClient.service";
import { IFindUserUseCase } from "@app/users/contracts/useCases/findUser.useCase";
import { BaseCommand, CommandProps } from "@discord/types/command";
import { UserEmbed } from "@discord/embeds/user";
import { injectable, inject } from "tsyringe";

@injectable()
export default class FindUser extends BaseCommand {
	constructor(@inject("IFindUserUseCase") private findUserUseCase: IFindUserUseCase) {
		super({
			name: "user",
			description: "search user",
			type: ApplicationCommandType.ChatInput,
			options: [
				{
					name: "query",
					required: false,
					description: "user id or username",
					type: ApplicationCommandOptionType.String,
				},
			],
		});
	}

	public run = async ({ interaction, options }: CommandProps): Promise<void> => {
		const user = await this.findUserUseCase.findUser(options.getString("query", false), OsuClientRuleset.Osu);

		const embed = new UserEmbed(user);

		interaction.reply({ embeds: [embed], flags: user === null ? MessageFlags.Ephemeral : undefined });
	};
}
