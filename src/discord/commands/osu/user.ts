import { ApplicationCommandOptionType, ApplicationCommandType, MessageFlags } from "discord.js";
import { OsuClientRuleset } from "@app/shared/contracts/services/osuClient.service";
import { IFindUserUseCase } from "@app/users/contracts/useCases/findUser.useCase";
import { BaseCommand, CommandProps } from "@discord/types/command";
import { ErrorEmbed } from "@discord/embeds/error";
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
					required: true,
					description: "user id or username",
					type: ApplicationCommandOptionType.String,
				},
			],
		});
	}

	public run = async ({ interaction, options }: CommandProps): Promise<void> => {
		const userExtended = await this.findUserUseCase.findUser(
			options.getString("query", true),
			OsuClientRuleset.Osu
		);

		if (userExtended === null) {
			interaction.reply({ embeds: [ErrorEmbed.notFoundEmbedBuilder("user")], flags: MessageFlags.Ephemeral });
			return
		}

		const embed = UserEmbed.userEmbedBuilder(userExtended);

		interaction.reply({ embeds: [embed] });
	};
}
