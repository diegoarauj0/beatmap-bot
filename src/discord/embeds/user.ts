import { OsuUserExtendedEntity } from "@domain/entities/osuUser.entity";
import { EmbedBuilder } from "discord.js";

export class UserEmbed extends EmbedBuilder {
	constructor(osuUserExtendedEntity: OsuUserExtendedEntity | null) {
		super();
		if (osuUserExtendedEntity === null) {
			this.userNotFound();
		} else {
			this.main(osuUserExtendedEntity);
		}
	}

	private userNotFound(): void {
		this.setColor("Red")
			.setTitle("❌ Player not found!")
			.setDescription("This user was not found.")
			.setTimestamp();
	}

	private main(osuUserExtendedEntity: OsuUserExtendedEntity | null): void {
		let description = "";
		const fields: { name: string; value: string }[] = [
			{
				name: "🌎 Country",
				value: `:flag_${osuUserExtendedEntity.country.code.toLowerCase()}: ${osuUserExtendedEntity.country.name}`,
			},
			{
				name: "🌐 Global Ranking",
				value: `${String(osuUserExtendedEntity.statistics.global_rank?.toLocaleString("en"))}`,
			},
			{
				name: "🏳️ Country Ranking",
				value: `${String(osuUserExtendedEntity.statistics.country_rank?.toLocaleString("en"))}`,
			},
			{ name: "⏲️ Total Play Time", value: `${osuUserExtendedEntity.playTime()}` },
			{ name: "🏅 Medals", value: `${osuUserExtendedEntity.user_achievements.length}` },
			{ name: "⚡ PP", value: `${osuUserExtendedEntity.statistics.pp.toLocaleString("en")}` },
			{
				name: "🏆 Ranks",
				value: `🇽|🇭: ${osuUserExtendedEntity.statistics.grade_counts.ssh} | 🇽: ${osuUserExtendedEntity.statistics.grade_counts.ss} | 🇸|🇭: ${osuUserExtendedEntity.statistics.grade_counts.sh} | 🇸: ${osuUserExtendedEntity.statistics.grade_counts.s} | 🇦: ${osuUserExtendedEntity.statistics.grade_counts.a}`,
			},
			{
				name: "💯 Ranked Score",
				value: `${String(osuUserExtendedEntity.statistics.ranked_score.toLocaleString("en"))}`,
			},
			{ name: "🎯 Hit Accuracy", value: `${String(osuUserExtendedEntity.statistics.hit_accuracy.toFixed(2))}%` },
			{
				name: "🎮 Play Count",
				value: `${String(osuUserExtendedEntity.statistics.play_count.toLocaleString("en"))}`,
			},
			{
				name: "📈 Total Score",
				value: `${String(osuUserExtendedEntity.statistics.total_score.toLocaleString("en"))}`,
			},
			{
				name: "🥁 Total Hits",
				value: `${String(osuUserExtendedEntity.statistics.total_hits.toLocaleString("en"))}`,
			},
			{
				name: "🔗 Maximum Combo",
				value: `${String(osuUserExtendedEntity.statistics.maximum_combo.toLocaleString("en"))}`,
			},
			{
				name: "👀 Replays Watched by Others",
				value: `${String(osuUserExtendedEntity.statistics.replays_watched_by_others.toLocaleString("en"))}`,
			},
			{ name: "📶 Level", value: `${String(osuUserExtendedEntity.statistics.level.current)}` },
			{ name: "📅 Joined", value: `<t:${new Date(osuUserExtendedEntity.join_date).getTime() / 1000}:R>` },
		];

		fields.forEach(({ value, name }) => {
			description += `**| ▸ ${name}: ${value}**\n`;
		});

		this.setColor("Random")
			.setAuthor({
				name: `Profile ${osuUserExtendedEntity.username}`,
				url: `https://osu.ppy.sh/users/${osuUserExtendedEntity.id}`,
				iconURL: osuUserExtendedEntity.avatar_url,
			})
			.setThumbnail(osuUserExtendedEntity.avatar_url)
			.setDescription(description)
			.setTitle("About")
			.setTimestamp();
	}
}
