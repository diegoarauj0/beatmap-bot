import { UserExtendedOsuEntity } from "@domain/entities/osuUser.entity";
import { EmbedBuilder } from "discord.js";

export class UserEmbed extends EmbedBuilder {
	constructor(userExtendedOsuEntity: UserExtendedOsuEntity | null) {
		super();
		if (userExtendedOsuEntity === null) {
			this.userNotFound();
		} else {
			this.main(userExtendedOsuEntity);
		}
	}

	private userNotFound(): void {
		this.setColor("Red")
			.setTitle("❌ Player not found!")
			.setDescription("This user was not found.")
			.setTimestamp();
	}

	private main(userExtendedOsuEntity: UserExtendedOsuEntity): void {
		let description = "";
		const fields: { name: string; value: string }[] = [
			{
				name: "🌎 Country",
				value: `:flag_${userExtendedOsuEntity.country.code.toLowerCase()}: ${userExtendedOsuEntity.country.name}`,
			},
			{
				name: "🌐 Global Ranking",
				value: `${String(userExtendedOsuEntity.statistics.global_rank?.toLocaleString("en"))}`,
			},
			{
				name: "🏳️ Country Ranking",
				value: `${String(userExtendedOsuEntity.statistics.country_rank?.toLocaleString("en"))}`,
			},
			{ name: "⏲️ Total Play Time", value: `${userExtendedOsuEntity.playTime()}` },
			{ name: "🏅 Medals", value: `${userExtendedOsuEntity.user_achievements.length}` },
			{ name: "⚡ PP", value: `${userExtendedOsuEntity.statistics.pp.toLocaleString("en")}` },
			{
				name: "🏆 Ranks",
				value: `🇽|🇭: ${userExtendedOsuEntity.statistics.grade_counts.ssh} | 🇽: ${userExtendedOsuEntity.statistics.grade_counts.ss} | 🇸|🇭: ${userExtendedOsuEntity.statistics.grade_counts.sh} | 🇸: ${userExtendedOsuEntity.statistics.grade_counts.s} | 🇦: ${userExtendedOsuEntity.statistics.grade_counts.a}`,
			},
			{
				name: "💯 Ranked Score",
				value: `${String(userExtendedOsuEntity.statistics.ranked_score.toLocaleString("en"))}`,
			},
			{ name: "🎯 Hit Accuracy", value: `${String(userExtendedOsuEntity.statistics.hit_accuracy.toFixed(2))}%` },
			{
				name: "🎮 Play Count",
				value: `${String(userExtendedOsuEntity.statistics.play_count.toLocaleString("en"))}`,
			},
			{
				name: "📈 Total Score",
				value: `${String(userExtendedOsuEntity.statistics.total_score.toLocaleString("en"))}`,
			},
			{
				name: "🥁 Total Hits",
				value: `${String(userExtendedOsuEntity.statistics.total_hits.toLocaleString("en"))}`,
			},
			{
				name: "🔗 Maximum Combo",
				value: `${String(userExtendedOsuEntity.statistics.maximum_combo.toLocaleString("en"))}`,
			},
			{
				name: "👀 Replays Watched by Others",
				value: `${String(userExtendedOsuEntity.statistics.replays_watched_by_others.toLocaleString("en"))}`,
			},
			{ name: "📶 Level", value: `${String(userExtendedOsuEntity.statistics.level.current)}` },
			{ name: "📅 Joined", value: `<t:${new Date(userExtendedOsuEntity.join_date).getTime() / 1000}:R>` },
		];

		fields.forEach(({ value, name }) => {
			description += `**| ▸ ${name}: ${value}**\n`;
		});

		this.setColor("Random")
			.setAuthor({
				name: `Profile ${userExtendedOsuEntity.username}`,
				url: `https://osu.ppy.sh/users/${userExtendedOsuEntity.id}`,
				iconURL: userExtendedOsuEntity.avatar_url,
			})
			.setThumbnail(userExtendedOsuEntity.avatar_url)
			.setDescription(description)
			.setTitle("About")
			.setTimestamp();
	}
}
