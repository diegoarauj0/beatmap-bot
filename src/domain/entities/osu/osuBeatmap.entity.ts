type Ruleset = "osu" | "taiko" | "fruits" | "mania";

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

export class OsuBeatmapEntity implements IOsuBeatmap {
	public beatmapset: IOsuBeatmapsetExtended;
	public current_user_playcount: number;
	public owners: IBeatmapOwner[];
	public failtimes: IFailtimes;
	public difficulty_rating: number;
	public beatmapset_id: number;
	public total_length: number;
	public checksum?: string;
	public max_combo: number;
	public version: string;
	public user_id: number;
	public status: string;
	public mode: Ruleset;
	public id: number;

	constructor(props: IOsuBeatmap) {
		Object.assign(this, props);
	}
}

export class OsuBeatmapExtendedEntity extends OsuBeatmapEntity implements IOsuBeatmapExtended {
	public count_spinners: number;
	public count_sliders: number;
	public count_circles: number;
	public is_scoreable: boolean;
	public last_updated: string;
	public deleted_at: string;
	public hit_length: number;
	public playcount: number;
	public passcount: number;
	public accuracy: number;
	public convert: boolean;
	public mode_int: number;
	public ranked: number;
	public drain: number;
	public bpm?: number;
	public url: string;
	public cs: number;
	public ar: number;

	constructor(props: IOsuBeatmapExtended) {
		super(props);
		Object.assign(this, props);
	}

	public totalLength(): string {
		let seconds = this.total_length

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

export class OsuBeatmapsetEntity implements IOsuBeatmapset {
	public beatmaps: (IOsuBeatmap | IOsuBeatmapExtended)[];
	public favourite_count: number;
	public artist_unicode: string;
	public title_unicode: string;
	public preview_url: string;
	public play_count: number;
	public spotlight: boolean;
	public covers: ICovers;
	public creator: string;
	public user_id: number;
	public offset: number;
	public artist: string;
	public status: string;
	public video: boolean;
	public source: string;
	public nsfw: boolean;
	public title: string;
	public id: number;

	constructor(props: IOsuBeatmap) {
		Object.assign(this, props);
	}
}

export class OsuBeatmapsetExtendedEntity extends OsuBeatmapsetEntity implements IOsuBeatmapsetExtended {
	public availability: { download_disabled: boolean; more_information: string };
	public nominations_summary: { current: number; required: number };
	public hype: { current: number; required: number };
	public discussion_enabled: boolean;
	public discussion_locked: boolean;
	public legacy_thread_url: string;
	public submitted_date?: string;
	public can_be_hyped: boolean;
	public is_scoreable: boolean;
	public last_updated: string;
	public ranked_date?: string;
	public deleted_at?: string;
	public storyboard: boolean;
	public rating: number;
	public ranked: number;
	public tags: string;
	public bpm: number;

	constructor(props: IOsuBeatmapExtended) {
		super(props);
		Object.assign(this, props);
	}
}
