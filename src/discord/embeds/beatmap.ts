import { IOsuBeatmapExtended } from "@app/shared/contracts/services/osuClient.service";
import { formatDuration } from "@discord/utils/formatDuration";
import { EmbedBuilder } from "discord.js";

export class BeatmapEmbed {
	static beatmapEmbedBuilder(osuBeatmapExtended: IOsuBeatmapExtended): EmbedBuilder {
		let description = "";

		const fields: Array<{ name: string; value?: string } | string> = [
			"🎨 Beatmap information",
			{
				name: "👤 Creator",
				value: osuBeatmapExtended.beatmapset.creator,
			},
			{
				name: "🆔 Beatmap ID",
				value: osuBeatmapExtended.id ? String(osuBeatmapExtended.id) : undefined,
			},
			{
				name: "📂 Beatmapset ID",
				value: osuBeatmapExtended.beatmapset.id ? String(osuBeatmapExtended.beatmapset.id) : undefined,
			},
			{
				name: "🎚️ Version",
				value: osuBeatmapExtended.version,
			},
			{
				name: "🎯 AR (Approach Rate)",
				value: osuBeatmapExtended.ar ? String(osuBeatmapExtended.ar) : undefined,
			},
			{
				name: "🎯 CS (Circle Size)",
				value: osuBeatmapExtended.cs ? String(osuBeatmapExtended.cs) : undefined,
			},
			{
				name: "🎯 Accuracy (OD)",
				value: osuBeatmapExtended.accuracy ? String(osuBeatmapExtended.accuracy) : undefined,
			},
			{
				name: "❤️ HP Drain",
				value: osuBeatmapExtended.drain ? String(osuBeatmapExtended.drain) : undefined,
			},
			{
				name: "🔵 Circles",
				value: osuBeatmapExtended.count_circles ? String(osuBeatmapExtended.count_circles) : undefined,
			},
			{
				name: "➰ Sliders",
				value: osuBeatmapExtended.count_sliders ? String(osuBeatmapExtended.count_sliders) : undefined,
			},
			{
				name: "🌀 Spinners",
				value: osuBeatmapExtended.count_spinners ? String(osuBeatmapExtended.count_spinners) : undefined,
			},
			{
				name: "🔗 Max Combo",
				value: osuBeatmapExtended.max_combo ? String(osuBeatmapExtended.max_combo) : undefined,
			},

			"🎶 Music information",
			{
				name: "📖 Title",
				value: `${osuBeatmapExtended.beatmapset.title}${osuBeatmapExtended.beatmapset.title_unicode ? ` - ${osuBeatmapExtended.beatmapset.title_unicode}` : ""}`,
			},
			{
				name: "🎤 Artist",
				value: `${osuBeatmapExtended.beatmapset.artist}${osuBeatmapExtended.beatmapset.artist_unicode ? ` - ${osuBeatmapExtended.beatmapset.artist_unicode}` : ""}`,
			},
			{
				name: "🎬 Source",
				value: osuBeatmapExtended.beatmapset.source,
			},
			{
				name: "🎵 BPM",
				value: osuBeatmapExtended.bpm ? String(osuBeatmapExtended.bpm) : undefined,
			},
			{
				name: "⏱️ Length",
				value: formatDuration(osuBeatmapExtended.hit_length),
			},
			{
				name: "🔊 Preview",
				value: `[🔊 Ouvir Preview](https:${osuBeatmapExtended.beatmapset.preview_url})`,
			},

			"📊 Statistics",
			{
				name: "🎮 Playcount",
				value: osuBeatmapExtended.playcount ? String(osuBeatmapExtended.playcount) : undefined,
			},
			{
				name: "✅ Passcount",
				value: osuBeatmapExtended.passcount ? String(osuBeatmapExtended.passcount) : undefined,
			},
			{
				name: "⭐ Favourites",
				value: osuBeatmapExtended.beatmapset.favourite_count
					? String(osuBeatmapExtended.beatmapset.favourite_count)
					: undefined,
			},
			{
				name: "🌟 Rating",
				value: osuBeatmapExtended.beatmapset.rating
					? String(osuBeatmapExtended.beatmapset.rating.toFixed(2))
					: undefined,
			},
			{
				name: "📌 Status",
				value: osuBeatmapExtended.beatmapset.status,
			},
		];

		fields.forEach((v) => {
			if (typeof v === "string") {
				return (description += `\n**| ▸▸▸ ${v}**\n--------------------------------------------------\n`);
			}

			description += `**| ▸ ${v.name}: ${v.value}**\n`;
		});

		const embed = new EmbedBuilder()
			.setAuthor({
				name: `${osuBeatmapExtended.beatmapset.creator} - ${osuBeatmapExtended.beatmapset.title}`,
				iconURL: osuBeatmapExtended.beatmapset.covers["list@2x"],
				url: osuBeatmapExtended.url,
			})
			.setImage(osuBeatmapExtended.beatmapset.covers["card@2x"])
			.setTitle("About")
			.setDescription(description)
			.setColor("Random")
			.setTimestamp();

		return embed;
	}
}
