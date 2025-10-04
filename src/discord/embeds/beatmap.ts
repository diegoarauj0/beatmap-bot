import { IOsuBeatmapExtended } from "@app/shared/contracts/services/osuClient.service";
import { formatDuration } from "@discord/utils/formatDuration";
import { EmbedBuilder } from "discord.js";
import { i18n } from "i18next";

export class BeatmapEmbed {
	static beatmapEmbedBuilder(
		osuBeatmapExtended: IOsuBeatmapExtended,
		i18n: i18n,
		lang: string
	): EmbedBuilder {
		let description = ``;

		const fields: Array<{ name: string; value?: string } | string> = [
			`🎨 ${i18n.t("commands.user.fields.titles.basic_profile", { lng: lang })}`,
			{
				name: `👤 ${i18n.t("commands.beatmap.fields.beatmap_information.creator", { lng: lang })}`,
				value: osuBeatmapExtended.beatmapset.creator,
			},
			{
				name: `🆔 ${i18n.t("commands.beatmap.fields.beatmap_information.beatmap_id", { lng: lang })}`,
				value: osuBeatmapExtended.id ? String(osuBeatmapExtended.id) : undefined,
			},
			{
				name: `📂 ${i18n.t("commands.beatmap.fields.beatmap_information.beatmapset_id", { lng: lang })}`,
				value: osuBeatmapExtended.beatmapset.id ? String(osuBeatmapExtended.beatmapset.id) : undefined,
			},
			{
				name: `🎚️ ${i18n.t("commands.beatmap.fields.beatmap_information.version", { lng: lang })}`,
				value: osuBeatmapExtended.version,
			},
			{
				name: `🎯 ${i18n.t("commands.beatmap.fields.beatmap_information.ar", { lng: lang })}`,
				value: osuBeatmapExtended.ar ? String(osuBeatmapExtended.ar) : undefined,
			},
			{
				name: `🎯 ${i18n.t("commands.beatmap.fields.beatmap_information.cs", { lng: lang })}`,
				value: osuBeatmapExtended.cs ? String(osuBeatmapExtended.cs) : undefined,
			},
			{
				name: `🎯 ${i18n.t("commands.beatmap.fields.beatmap_information.accuracy", { lng: lang })}`,
				value: osuBeatmapExtended.accuracy ? String(osuBeatmapExtended.accuracy) : undefined,
			},
			{
				name: `❤️ ${i18n.t("commands.beatmap.fields.beatmap_information.drain", { lng: lang })}`,
				value: osuBeatmapExtended.drain ? String(osuBeatmapExtended.drain) : undefined,
			},
			{
				name: `🔵 ${i18n.t("commands.beatmap.fields.beatmap_information.circles", { lng: lang })}`,
				value: osuBeatmapExtended.count_circles ? String(osuBeatmapExtended.count_circles) : undefined,
			},
			{
				name: `➰ ${i18n.t("commands.beatmap.fields.beatmap_information.sliders", { lng: lang })}`,
				value: osuBeatmapExtended.count_sliders ? String(osuBeatmapExtended.count_sliders) : undefined,
			},
			{
				name: `🌀 ${i18n.t("commands.beatmap.fields.beatmap_information.spinners", { lng: lang })}`,
				value: osuBeatmapExtended.count_spinners ? String(osuBeatmapExtended.count_spinners) : undefined,
			},
			{
				name: `🔗 ${i18n.t("commands.beatmap.fields.beatmap_information.max_combo", { lng: lang })}`,
				value: osuBeatmapExtended.max_combo ? String(osuBeatmapExtended.max_combo) : undefined,
			},

			`🎶 ${i18n.t("commands.beatmap.fields.titles.music_information", { lng: lang })}`,
			{
				name: `📖 ${i18n.t("commands.beatmap.fields.music_information.title", { lng: lang })}`,
				value: `${osuBeatmapExtended.beatmapset.title}${osuBeatmapExtended.beatmapset.title_unicode ? ` - ${osuBeatmapExtended.beatmapset.title_unicode}` : ``}`,
			},
			{
				name: `🎤 ${i18n.t("commands.beatmap.fields.music_information.artist", { lng: lang })}`,
				value: `${osuBeatmapExtended.beatmapset.artist}${osuBeatmapExtended.beatmapset.artist_unicode ? ` - ${osuBeatmapExtended.beatmapset.artist_unicode}` : ``}`,
			},
			{
				name: `🎬 ${i18n.t("commands.beatmap.fields.music_information.source", { lng: lang })}`,
				value: osuBeatmapExtended.beatmapset.source,
			},
			{
				name: `🎵 ${i18n.t("commands.beatmap.fields.music_information.BPM", { lng: lang })}`,
				value: osuBeatmapExtended.bpm ? String(osuBeatmapExtended.bpm) : undefined,
			},
			{
				name: `⏱️ ${i18n.t("commands.beatmap.fields.music_information.length", { lng: lang })}`,
				value: formatDuration(osuBeatmapExtended.hit_length),
			},
			{
				name: `🔊 ${i18n.t("commands.beatmap.fields.music_information.preview", { lng: lang })}`,
				value: `[🔊 Ouvir Preview](https:${osuBeatmapExtended.beatmapset.preview_url})`,
			},

			`📊 ${i18n.t("commands.beatmap.fields.titles.statistics", { lng: lang })}`,
			{
				name: `🎮 ${i18n.t("commands.beatmap.fields.statistics.play_count", { lng: lang })}`,
				value: osuBeatmapExtended.playcount ? String(osuBeatmapExtended.playcount) : undefined,
			},
			{
				name: `✅ ${i18n.t("commands.beatmap.fields.statistics.pass_count", { lng: lang })}`,
				value: osuBeatmapExtended.passcount ? String(osuBeatmapExtended.passcount) : undefined,
			},
			{
				name: `⭐ ${i18n.t("commands.beatmap.fields.statistics.favourites", { lng: lang })}`,
				value: osuBeatmapExtended.beatmapset.favourite_count
					? String(osuBeatmapExtended.beatmapset.favourite_count)
					: undefined,
			},
			{
				name: `🌟 ${i18n.t("commands.beatmap.fields.statistics.rating", { lng: lang })}`,
				value: osuBeatmapExtended.beatmapset.rating
					? String(osuBeatmapExtended.beatmapset.rating.toFixed(2))
					: undefined,
			},
			{
				name: `📌 ${i18n.t("commands.beatmap.fields.statistics.status", { lng: lang })}`,
				value: osuBeatmapExtended.beatmapset.status,
			},
		];

		fields.forEach((v) => {
			if (typeof v === `string`) {
				return (description += `\n**| ▸▸▸ ${v}**\n--------------------------------------------------\n`);
			}

			description += `**| ▸ ${v.name}: ${v.value}**\n`;
		});

		const embed = new EmbedBuilder()
			.setAuthor({
				name: `${osuBeatmapExtended.beatmapset.creator} - ${osuBeatmapExtended.beatmapset.title}`,
				iconURL: osuBeatmapExtended.beatmapset.covers[`list@2x`],
				url: osuBeatmapExtended.url,
			})
			.setImage(osuBeatmapExtended.beatmapset.covers[`card@2x`])
			.setTitle(`About`)
			.setDescription(description)
			.setColor(`Random`)
			.setTimestamp();

		return embed;
	}
}
