import { IOsuBeatmapExtended } from "@app/shared/contracts/services/osuClient.service";

export interface IFindBeatmapUseCase {
	findBeatmap: (beatmapId: number) => Promise<IOsuBeatmapExtended | null>;
}
