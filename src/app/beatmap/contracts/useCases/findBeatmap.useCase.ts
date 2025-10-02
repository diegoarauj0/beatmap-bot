import {  OsuBeatmapExtendedEntity } from "@domain/entities/osuBeatmap.entity";

export interface IFindBeatmapUseCase {
	findBeatmap: (beatmapId: number) => Promise<OsuBeatmapExtendedEntity | null>;
}
