import { DiscordClient } from "@discord/client";
import {
	ApplicationCommandData,
	ButtonInteraction,
	Collection,
	CommandInteraction,
	CommandInteractionOptionResolver,
	ModalSubmitInteraction,
	StringSelectMenuInteraction,
} from "discord.js";
import { i18n } from "i18next";

export interface CommandProps {
	options: CommandInteractionOptionResolver;
	interaction: CommandInteraction;
	client: DiscordClient;
	i18next: i18n
}

export type ComponentsButton = Collection<string, (interaction: ButtonInteraction) => unknown>;
export type ComponentsSelect = Collection<string, (interaction: StringSelectMenuInteraction) => unknown>;
export type ComponentsModal = Collection<string, (interaction: ModalSubmitInteraction) => unknown>;

export interface CommandComponents {
	buttons?: ComponentsButton;
	selects?: ComponentsSelect;
	modals?: ComponentsModal;
}

export interface CommandType extends CommandComponents {
	applicationCommandData: ApplicationCommandData;
	run: (props: CommandProps) => void | Promise<void>;
}

export abstract class BaseCommand implements CommandType {
	public buttons?: ComponentsButton;
	public modals?: ComponentsModal;
	public selects?: ComponentsSelect;
	public readonly applicationCommandData: ApplicationCommandData;

	constructor(applicationCommandData: ApplicationCommandData) {
		this.applicationCommandData = applicationCommandData;
	}

	public abstract run: (props: CommandProps) => void | Promise<void>;
}
