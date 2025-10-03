export enum OsuClientRuleset {
	Fruits = "fruits",
	Taiko = "taiko",
	Mania = "mania",
	Osu = "osu",
}

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

export interface IOsuUserExtendedProfile extends IOsuUserProfile {
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

export interface IFailtimes {
	exit?: number[];
	fail?: number[];
}

export interface IBeatmapOwner {
	id: number;
	username: string;
}

export interface IOsuBeatmap {
	beatmapset_id: number;
	difficulty_rating: number;
	id: number;
	mode: Ruleset;
	status: string;
	total_length: number;
	user_id: number;
	version: string;
	beatmapset: IOsuBeatmapsetExtended;
	checksum?: string;
	current_user_playcount: number;
	max_combo: number;
	failtimes: IFailtimes;
	owners: IBeatmapOwner[];
}

export interface IOsuBeatmapExtended extends IOsuBeatmap {
	accuracy: number;
	ar: number;
	beatmapset_id: number;
	bpm?: number;
	convert: boolean;
	count_circles: number;
	count_sliders: number;
	count_spinners: number;
	cs: number;
	deleted_at: string;
	drain: number;
	hit_length: number;
	is_scoreable: boolean;
	last_updated: string;
	mode_int: number;
	passcount: number;
	playcount: number;
	ranked: number;
	url: string;
}

export interface ICovers {
	"slimcover@2x": string;
	"cover@2x": string;
	"card@2x": string;
	"list@2x": string;
	slimcover: string;
	cover: string;
	card: string;
	list: string;
}

export interface IOsuBeatmapset {
	beatmaps: Array<IOsuBeatmap | IOsuBeatmapExtended>;
	favourite_count: number;
	artist_unicode: string;
	title_unicode: string;
	preview_url: string;
	play_count: number;
	spotlight: boolean;
	covers: ICovers;
	creator: string;
	user_id: number;
	offset: number;
	artist: string;
	source: string;
	status: string;
	video: boolean;
	nsfw: boolean;
	title: string;
	id: number;
}

export interface IOsuBeatmapsetExtended extends IOsuBeatmapset {
	discussion_enabled: boolean;
	discussion_locked: boolean;
	legacy_thread_url: string;
	submitted_date?: string;
	is_scoreable: boolean;
	can_be_hyped: boolean;
	last_updated: string;
	ranked_date?: string;
	deleted_at?: string;
	storyboard: boolean;
	source: string;
	rating: number;
	ranked: number;
	tags: string;
	bpm: number;
	availability: {
		download_disabled: boolean;
		more_information: string;
	};
	hype: {
		current: number;
		required: number;
	};
	nominations_summary: {
		current: number;
		required: number;
	};
}

export interface IOsuClientService {
	findUser(query: string | number, ruleset: OsuClientRuleset): Promise<null | IOsuUserExtendedProfile>;
	findBeatmap(beatmapId: number): Promise<null | IOsuBeatmapExtended>;
}
