import { OsuBeatmapExtendedEntity } from "@domain/entities/osu/osuBeatmap.entity";

export interface IFindBeatmapUseCase {
	findBeatmap: (beatmapId: number) => Promise<OsuBeatmapExtendedEntity | null>;
}
