interface IUserAccountHistory {
	description?: string;
	id: number;
	length: number;
	permanent: boolean;
	timestamp: string;
	type: "note" | "restriction" | "silence";
}

interface IProfileBanner {
	id: number;
	tournament_id: number;
	image?: string;
	"image@2x"?: string;
}

interface IUserBadge {
	awarded_at: string;
	description: string;
	"image@2x_url": string;
	image_url: string;
	url: string;
}

interface IUserGroup {
	playmodes: string[];
}

interface IKudosu {
	available: number;
	total: number;
}

interface IRankHighest {
	rank: number;
	updated_at: string;
}

interface IGradeCounts {
	a: number;
	s: number;
	sh: number;
	ss: number;
	ssh: number;
}

interface ILevel {
	current: number;
	progress: number;
}

interface IUserStatistics {
	count_50: number;
	count_100: number;
	count_300: number;
	count_miss: number;
	country_rank?: number;
	grade_counts: IGradeCounts;
	hit_accuracy: number;
	is_ranked: boolean;
	level: ILevel;
	maximum_combo: number;
	play_count: number;
	play_time: number;
	pp: number;
	pp_exp: number;
	global_rank?: number;
	global_rank_exp?: number;
	ranked_score: number;
	replays_watched_by_others: number;
	total_hits: number;
	total_score: number;
}

interface IOsuUserProfile {
	avatar_url: string;
	country_code: string;
	default_group?: string;
	id: number;
	is_active: boolean;
	is_bot: boolean;
	is_deleted: boolean;
	is_online: boolean;
	is_supporter: boolean;
	last_visit?: string;
	pm_friends_only: boolean;
	profile_colour?: string;
	username: string;

	//Optional Attributes
	account_history: IUserAccountHistory[];
	active_tournament_banners: IProfileBanner[];
	badges: IUserBadge;
	beatmap_playcounts_count: number;
	country: { code: string; name: string };
	cover: { custom_url: string; url: string; id: number | null };
	favourite_beatmapset_count: number;
	follow_user_mapping: number[];
	follower_count: number;
	graveyard_beatmapset_count: number;
	groups: IUserGroup;
	guest_beatmapset_count: number;
	is_restricted?: boolean;
	kudosu: IKudosu;
	loved_beatmapset_count: number;
	mapping_follower_count: number;
	monthly_playcounts: { start_date: string; count: number }[];
	nominated_beatmapset_count: number;
	page: { html: string; raw: string };
	pending_beatmapset_count: number;
	previous_usernames: string[];
	rank_highest: IRankHighest;
	rank_history: { mode: string; data: number[] };
	ranked_beatmapset_count: number;
	replays_watched_counts: { start_date: string; count: number }[];
	scores_best_count: number;
	scores_first_count: number;
	scores_recent_count: number;
	session_verified: boolean;
	statistics: IUserStatistics;
	support_level: number;
	user_achievements: { achieved_at: string; achievement_id: number }[];
}

type Ruleset = "osu" | "taiko" | "fruits" | "mania";
type ProfilePage = "me" | "recent_activity" | "beatmaps" | "historical" | "kudosu" | "top_ranks" | "medals";

export interface IOsuUserExtenderProfile extends IOsuUserProfile {
	cover_url: string;
	discord?: string;
	has_supported: boolean;
	interests?: string;
	join_date: string;
	location?: string;
	max_blocks: number;
	max_friends: number;
	occupation?: string;
	playmode: Ruleset;
	playstyle: string[];
	post_count: number;
	profile_hue?: number;
	profile_order: ProfilePage[];
	title?: string;
	title_url?: string;
	twitter?: string;
	website?: string;
}

export class OsuUserEntity implements IOsuUserProfile {
	public avatar_url: string;
	public country_code: string;
	public default_group?: string;
	public id: number;
	public is_active: boolean;
	public is_bot: boolean;
	public is_deleted: boolean;
	public is_online: boolean;
	public is_supporter: boolean;
	public last_visit?: string;
	public pm_friends_only: boolean;
	public profile_colour?: string;
	public username: string;
	public account_history: IUserAccountHistory[];
	public active_tournament_banners: IProfileBanner[];
	public badges: IUserBadge;
	public beatmap_playcounts_count: number;
	public country: { code: string; name: string };
	public cover: { custom_url: string; url: string; id: number | null };
	public favourite_beatmapset_count: number;
	public follow_user_mapping: number[];
	public follower_count: number;
	public graveyard_beatmapset_count: number;
	public groups: IUserGroup;
	public guest_beatmapset_count: number;
	public is_restricted?: boolean;
	public kudosu: IKudosu;
	public loved_beatmapset_count: number;
	public mapping_follower_count: number;
	public monthly_playcounts: { start_date: string; count: number }[];
	public nominated_beatmapset_count: number;
	public page: { html: string; raw: string };
	public pending_beatmapset_count: number;
	public previous_usernames: string[];
	public rank_highest: IRankHighest;
	public rank_history: { mode: string; data: number[] };
	public ranked_beatmapset_count: number;
	public replays_watched_counts: { start_date: string; count: number }[];
	public scores_best_count: number;
	public scores_first_count: number;
	public scores_recent_count: number;
	public session_verified: boolean;
	public statistics: IUserStatistics;
	public support_level: number;
	public user_achievements: { achieved_at: string; achievement_id: number }[];

	constructor(props: IOsuUserProfile) {
		Object.assign(this, props);
	}
}

export class UserExtendedOsuEntity extends OsuUserEntity implements IOsuUserExtenderProfile {
	public cover_url: string;
	public discord?: string;
	public has_supported: boolean;
	public interests?: string;
	public join_date: string;
	public location?: string;
	public max_blocks: number;
	public max_friends: number;
	public occupation?: string;
	public playmode: Ruleset;
	public playstyle: string[];
	public post_count: number;
	public profile_hue?: number;
	public profile_order: ProfilePage[];
	public title?: string;
	public title_url?: string;
	public twitter?: string;
	public website?: string;

	constructor(props: IOsuUserExtenderProfile) {
		super(props);
		Object.assign(this, props);
	}

	public playTime(): string {
		let seconds = this.statistics.play_time

		const days = Math.floor(seconds/ (24 * 3600));
		seconds %= 24 * 3600;
		const hours = Math.floor(seconds / 3600);
		seconds %= 3600;
		const minutes = Math.floor(seconds / 60);
		seconds %= 60;

		const parts: string[] = [];

		if (days > 0) parts.push(`${days} ${days === 1 ? "Day" : "Days"}`);
		if (hours > 0) parts.push(`${hours} ${hours === 1 ? "Hour" : "Hours"}`);
		if (minutes > 0) parts.push(`${minutes} ${minutes === 1 ? "Minute" : "Minutes"}`);
		if (seconds > 0 || parts.length === 0) parts.push(`${seconds} ${seconds === 1 ? "Second" : "Seconds"}`);

		return parts.join(" , ");
	}
}
