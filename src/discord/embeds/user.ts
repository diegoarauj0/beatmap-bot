import { IOsuUserExtendedProfile } from "@app/shared/contracts/services/osuClient.service";
import { EmbedBuilder } from "discord.js";
import { i18n } from "i18next";

export class UserEmbed {
	static userEmbedBuilder(
		osuUserExtendedProfile: IOsuUserExtendedProfile,
		i18n: i18n,
		lang: string
	): EmbedBuilder {
		let description = ``;

		const fields: Array<{ name: string; value?: string } | string> = [
			`${i18n.t("commands.user.fields.titles.basic_profile", { lng: lang })}`,
			{
				name: `🆔 ${i18n.t("commands.user.fields.basic_profile.id", { lng: lang })}`,
				value: `${osuUserExtendedProfile.id}`,
			},
			{
				name: `🌐 ${i18n.t("commands.user.fields.basic_profile.country", { lng: lang })}`,
				value: `${osuUserExtendedProfile.country.name}`,
			},
			{
				name: `🎮 ${i18n.t("commands.user.fields.basic_profile.play_mode", { lng: lang })}`,
				value: `${osuUserExtendedProfile.playmode}`,
			},
			{
				name: `⌛ ${i18n.t("commands.user.fields.basic_profile.join_date", { lng: lang })}`,
				value: new Date(osuUserExtendedProfile.join_date).toLocaleDateString(),
			},
			{
				name: `🏢 ${i18n.t("commands.user.fields.basic_profile.location", { lng: lang })}`,
				value: osuUserExtendedProfile.location || `N/A`,
			},
			{
				name: `💻 ${i18n.t("commands.user.fields.basic_profile.play_style", { lng: lang })}`,
				value: osuUserExtendedProfile.playstyle.join(`, `),
			},
			{
				name: `🖥️ ${i18n.t("commands.user.fields.basic_profile.discord", { lng: lang })}`,
				value: osuUserExtendedProfile.discord || `N/A`,
			},
			`${i18n.t("commands.user.fields.titles.statistic", { lng: lang })}`,
			{
				name: `⭐ ${i18n.t("commands.user.fields.statistic.pp", { lng: lang })}`,
				value: `${osuUserExtendedProfile.statistics.pp}`,
			},
			{
				name: `📊 ${i18n.t("commands.user.fields.statistic.global_rank", { lng: lang })}`,
				value: `#${osuUserExtendedProfile.statistics.global_rank}`,
			},
			{
				name: `🏆 ${i18n.t("commands.user.fields.statistic.country_rank", { lng: lang })}`,
				value: `#${osuUserExtendedProfile.statistics.country_rank}`,
			},
			{
				name: `💯 ${i18n.t("commands.user.fields.statistic.hit_accuracy", { lng: lang })}`,
				value: `${osuUserExtendedProfile.statistics.hit_accuracy.toFixed(2)}%`,
			},
			{
				name: `🎮 ${i18n.t("commands.user.fields.statistic.play_count", { lng: lang })}`,
				value: `${osuUserExtendedProfile.statistics.play_count}`,
			},
			{
				name: `⏱️ ${i18n.t("commands.user.fields.statistic.play_time", { lng: lang })}`,
				value: `${Math.floor(osuUserExtendedProfile.statistics.play_time / 3600)}h`,
			},
			`${i18n.t("commands.user.fields.titles.beatmaps", { lng: lang })}`,
			{
				name: `📁 ${i18n.t("commands.user.fields.beatmaps.ranked_beatmaps", { lng: lang })}`,
				value: `${osuUserExtendedProfile.ranked_beatmapset_count}`,
			},
			{
				name: `💖 ${i18n.t("commands.user.fields.beatmaps.loved_beatmaps", { lng: lang })}`,
				value: `${osuUserExtendedProfile.loved_beatmapset_count}`,
			},
			{
				name: `⭐ ${i18n.t("commands.user.fields.beatmaps.favourite_beatmaps", { lng: lang })}`,
				value: `${osuUserExtendedProfile.favourite_beatmapset_count}`,
			},
			`${i18n.t("commands.user.fields.titles.scores", { lng: lang })}`,
			{
				name: `🏅 ${i18n.t("commands.user.fields.scores.ssh")}`,
				value: `${osuUserExtendedProfile.statistics.grade_counts.ssh}`,
			},
			{
				name: `🏅 ${i18n.t("commands.user.fields.scores.ss")}`,
				value: `${osuUserExtendedProfile.statistics.grade_counts.ss}`,
			},
			{
				name: `🏅 ${i18n.t("commands.user.fields.scores.sh")}`,
				value: `${osuUserExtendedProfile.statistics.grade_counts.sh}`,
			},
			{
				name: `🏅 ${i18n.t("commands.user.fields.scores.s")}`,
				value: `${osuUserExtendedProfile.statistics.grade_counts.s}`,
			},
			{
				name: `🏅 ${i18n.t("commands.user.fields.scores.a")}`,
				value: `${osuUserExtendedProfile.statistics.grade_counts.a}`,
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
				name: osuUserExtendedProfile.username,
				iconURL: osuUserExtendedProfile.avatar_url,
				url: `https://osu.ppy.sh/users/${osuUserExtendedProfile.id}`,
			})
			.setThumbnail(osuUserExtendedProfile.avatar_url)
			.setImage(osuUserExtendedProfile.cover_url)
			.setTitle(`About`)
			.setDescription(description)
			.setColor(`Random`)
			.setTimestamp();

		return embed;
	}
}
