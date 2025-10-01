import path from "path";
import fs from "fs";
import { ApplicationCommandDataResolvable, Events } from "discord.js";
import { BaseCommand } from "../types/command";
import { DiscordClient } from "../client";
import { container, InjectionToken } from "tsyringe";

export async function loadCommands(client: DiscordClient) {
	const commands: Array<ApplicationCommandDataResolvable> = [];
	const commandsPath = path.resolve(__dirname, "../commands");
	const locals = await fs.promises.readdir(commandsPath);

	for (const local of locals) {
		const fileNames = (await fs.promises.readdir(path.resolve(commandsPath, local))).filter(
			client.fileCondition
		);

		for (const fileName of fileNames) {
			const baseCommand: InjectionToken<BaseCommand> = (
				await import(path.resolve(commandsPath, local, fileName))
			).default;
			const command = container.resolve(baseCommand);

			if (!command?.applicationCommandData) continue;

			console.log(`Loaded command: ${command.applicationCommandData.name}`);
			client.commands.set(command.applicationCommandData.name, command);
			commands.push(command.applicationCommandData);

			command.buttons?.forEach((run, key) => client.buttons.set(key, run));
			command.selects?.forEach((run, key) => client.selects.set(key, run));
			command.modals?.forEach((run, key) => client.modals.set(key, run));
		}
	}

	client.on(Events.ClientReady, () => {
		client.registerCommands(commands);
	});
}
