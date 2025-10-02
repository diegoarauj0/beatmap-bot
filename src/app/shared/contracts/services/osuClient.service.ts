import { OsuBeatmapExtendedEntity } from "@domain/entities/osu/osuBeatmap.entity";
import { OsuUserExtendedEntity } from "@domain/entities/osu/osuUser.entity";

export enum OsuClientRuleset {
	Fruits = "fruits",
	Taiko = "taiko",
	Mania = "mania",
	Osu = "osu",
}

export interface IOsuClientService {
	findUser(query: string | number, ruleset: OsuClientRuleset): Promise<null | OsuUserExtendedEntity>;
	findBeatmap(beatmapId: number): Promise<null | OsuBeatmapExtendedEntity>
}
