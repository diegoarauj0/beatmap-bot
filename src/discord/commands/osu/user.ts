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
			descriptionLocalizations: {
				"pt-BR": "Mostrar as informações do usuario",
			},
			description: "Show user information",
			type: ApplicationCommandType.ChatInput,
			options: [
				{
					descriptionLocalizations: {
						"pt-BR": "ID ou nome de usuario",
					},
					nameLocalizations: {
						"pt-BR": "parametro",
					},
					type: ApplicationCommandOptionType.String,
					description: "ID or username",
					required: true,
					name: "param",
				},
			],
		});
	}

	public run = async ({ interaction, options, i18next }: CommandProps): Promise<void> => {
		const userExtended = await this.findUserUseCase.findUser(
			options.getString("param", true),
			OsuClientRuleset.Osu
		);

		if (userExtended === null) {
			interaction.reply({ embeds: [ErrorEmbed.notFoundEmbedBuilder("user")], flags: MessageFlags.Ephemeral });
			return;
		}

		const lang = interaction.locale.startsWith("pt") ? "pt" : "en";
		const userEmbed = UserEmbed.userEmbedBuilder(userExtended, i18next, lang);

		interaction.reply({ embeds: [userEmbed] });
	};
}
