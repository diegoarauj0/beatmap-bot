import { EventType } from "@discord/types/event";
import { DiscordClient } from "@discord/client";
import { ClientEvents } from "discord.js";
import path from "path";
import fs from "fs";

export async function loadEvents(client: DiscordClient) {
	const eventsPath = path.resolve(__dirname, "../events");
	const locals = await fs.promises.readdir(eventsPath);

	for (const local of locals) {
		const fileNames = (await fs.promises.readdir(path.resolve(eventsPath, local))).filter(client.fileCondition);

		for (const fileName of fileNames) {
			const event: EventType<keyof ClientEvents> = (await import(path.resolve(eventsPath, local, fileName)))
				.default;

			if (!event?.name) continue;

			if (event.once) client.once(event.name, event.run);
			else client.on(event.name, event.run);
		}
	}
}
