import { ApplicationCommandDataResolvable, Client, Collection, GatewayIntentBits } from "discord.js";
import { CommandType, ComponentsButton, ComponentsModal, ComponentsSelect } from "./types/command";
import { loadCommands } from "./loaders/commandLoader";
import { loadEvents } from "./loaders/eventLoader";

export class DiscordClient extends Client {
	public readonly fileCondition = (fileName: string) => fileName.endsWith(".ts") || fileName.endsWith(".js");
	public readonly disableGlobalCommands = process.env.DISCORD_DISABLE_GLOBAL_COMMANDS === "true";
	public readonly isDev: boolean = process.env.NODE_ENV === "development";
	public commands: Collection<string, CommandType> = new Collection();
	public readonly serverId = process.env.DISCORD_SERVER_ID;
	public buttons: ComponentsButton = new Collection();
	public selects: ComponentsSelect = new Collection();
	public modals: ComponentsModal = new Collection();

	constructor() {
		super({ intents: [GatewayIntentBits.MessageContent] });
	}

	public start(token: string): void {
		loadCommands(this);
		loadEvents(this);
		this.login(token);
	}

	public async registerCommands(commands: Array<ApplicationCommandDataResolvable>) {
		try {
			if (this.isDev || this.disableGlobalCommands) {
				await this.guilds.cache.get(this.serverId).commands.set(commands);
			} else {
				await this.application.commands.set(commands);
			}

			console.log("Slash commands (/) defined");
		} catch (err) {
			console.error(err);
		}
	}
}
