import { IOsuUserExtendedProfile } from "@app/shared/contracts/services/osuClient.service";
import { EmbedBuilder } from "discord.js";

export class UserEmbed {
	static userEmbedBuilder(osuUserExtendedProfile: IOsuUserExtendedProfile): EmbedBuilder {
		let description = "";

		const fields: Array<{ name: string; value?: string } | string> = [
			"Basic profile",
			{ name: "🆔 ID", value: `${osuUserExtendedProfile.id}` },
			{ name: "🌐 Country", value: `${osuUserExtendedProfile.country.name}` },
			{ name: "🎮 Playmode", value: `${osuUserExtendedProfile.playmode}` },
			{ name: "⌛ Join Date", value: new Date(osuUserExtendedProfile.join_date).toLocaleDateString() },
			{ name: "🏢 Location", value: osuUserExtendedProfile.location || "N/A" },
			{ name: "💻 Playstyle", value: osuUserExtendedProfile.playstyle.join(", ") },
			{ name: "🖥️ Discord", value: osuUserExtendedProfile.discord || "N/A" },

			"Statistics",
			{ name: "⭐ PP", value: `${osuUserExtendedProfile.statistics.pp}` },
			{ name: "📊 Global Rank", value: `#${osuUserExtendedProfile.statistics.global_rank}` },
			{ name: "🏆 Country Rank", value: `#${osuUserExtendedProfile.statistics.country_rank}` },
			{ name: "💯 Hit Accuracy", value: `${osuUserExtendedProfile.statistics.hit_accuracy.toFixed(2)}%` },
			{ name: "🎮 Play Count", value: `${osuUserExtendedProfile.statistics.play_count}` },
			{ name: "⏱️ Play Time", value: `${Math.floor(osuUserExtendedProfile.statistics.play_time / 3600)}h` },

			"Beatmaps",
			{ name: "📁 Ranked Beatmaps", value: `${osuUserExtendedProfile.ranked_beatmapset_count}` },
			{ name: "💖 Loved Beatmaps", value: `${osuUserExtendedProfile.loved_beatmapset_count}` },
			{ name: "⭐ Favourite Beatmaps", value: `${osuUserExtendedProfile.favourite_beatmapset_count}` },

			"Scores",
			{ name: "🏅 SSH", value: `${osuUserExtendedProfile.statistics.grade_counts.ssh}` },
			{ name: "🏅 SS", value: `${osuUserExtendedProfile.statistics.grade_counts.ss}` },
			{ name: "🏅 SH", value: `${osuUserExtendedProfile.statistics.grade_counts.sh}` },
			{ name: "🏅 S", value: `${osuUserExtendedProfile.statistics.grade_counts.s}` },
			{ name: "🏅 A", value: `${osuUserExtendedProfile.statistics.grade_counts.a}` },
		];

		fields.forEach((v) => {
			if (typeof v === "string") {
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
			.setTitle("About")
			.setDescription(description)
			.setColor("Random")
			.setTimestamp();

		return embed;
	}
}
