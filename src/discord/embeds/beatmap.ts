import { OsuBeatmapExtendedEntity } from "@domain/entities/osu/osuBeatmap.entity";
import { EmbedBuilder } from "discord.js";

export class BeatmapEmbed extends EmbedBuilder {
	constructor(osuBeatmapExtendedEntity: OsuBeatmapExtendedEntity) {
		super();
		if (osuBeatmapExtendedEntity === null) {
			this.beatmapNotFound();
		} else {
			this.main(osuBeatmapExtendedEntity);
		}
	}

	private beatmapNotFound(): void {
		this.setColor("Red")
			.setTitle("❌ Beatmap not found!")
			.setDescription("This beatmap was not found.")
			.setTimestamp();
	}

	private main(osuBeatmapExtendedEntity: OsuBeatmapExtendedEntity): void {
		let description = "";
		const fields: { name: string; value: string }[] = [
			{
				name: "🎵 Title",
				value: `${osuBeatmapExtendedEntity.beatmapset.title}`,
			},
			{
				name: "👤 Creator",
				value: `${osuBeatmapExtendedEntity.beatmapset.creator}`,
			},
			{
				name: "⏱️ Length",
				value: `${osuBeatmapExtendedEntity.totalLength()}`,
			},
			{
				name: "🎼 BPM",
				value: `${osuBeatmapExtendedEntity.bpm}`,
			},
			{
				name: "⚪ Circles",
				value: `${osuBeatmapExtendedEntity.count_circles}`,
			},
			{
				name: "〰️ Sliders",
				value: `${osuBeatmapExtendedEntity.count_sliders}`,
			},
			{
				name: "🎯 Accuracy",
				value: `${osuBeatmapExtendedEntity.accuracy}`,
			},
			{
				name: "⚖️ Cs",
				value: `${osuBeatmapExtendedEntity.cs}`,
			},
			{
				name: "📈 Ar",
				value: `${osuBeatmapExtendedEntity.ar}`,
			},
			{
				name: "💧 Drain",
				value: `${osuBeatmapExtendedEntity.drain}`,
			},
			{
				name: "🔥 Difficulty",
				value: `${osuBeatmapExtendedEntity.difficulty_rating}`,
			},
			{
				name: "🎤 Name",
				value: `${osuBeatmapExtendedEntity.beatmapset.artist}`,
			},
			{
				name: "▶️ Play count",
				value: `${osuBeatmapExtendedEntity.playcount}`,
			},
			{
				name: "⭐ Favourite",
				value: `${osuBeatmapExtendedEntity.beatmapset.favourite_count}`,
			},
			{
				name: "📀 Version",
				value: `${osuBeatmapExtendedEntity.version}`,
			},
		];

		fields.forEach(({ value, name }) => {
			description += `**| ▸ ${name}: ${value}**\n`;
		});

		this.setColor("Random")
			.setAuthor({
				name: `${osuBeatmapExtendedEntity.beatmapset.creator} - ${osuBeatmapExtendedEntity.beatmapset.artist}`,
				url: osuBeatmapExtendedEntity.url,
			})
			.setImage(osuBeatmapExtendedEntity.beatmapset.covers["cover@2x"])
			.setDescription(description)
			.setTitle("About")
			.setTimestamp();
	}
}
