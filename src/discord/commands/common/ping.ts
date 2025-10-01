import { BaseCommand, CommandProps } from "@discord/types/command";
import { ApplicationCommandType } from "discord.js";
import { injectable } from "tsyringe";

@injectable()
export default class Ping extends BaseCommand {
	constructor() {
		super({
			name: "ping",
			description: "responde pong",
			type: ApplicationCommandType.ChatInput,
		});
	}

	public run = ({ interaction }: CommandProps): void | Promise<void> => {
		interaction.reply({ content: "Pong!" });
	};
}
