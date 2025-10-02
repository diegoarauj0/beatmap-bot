import { IOsuClientService } from "@app/shared/contracts/services/osuClient.service";
import { IFindBeatmapUseCase } from "../contracts/useCases/findBeatmap.useCase";
import { OsuBeatmapExtendedEntity } from "@domain/entities/osuBeatmap.entity";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindBeatmapUseCase implements IFindBeatmapUseCase {
	constructor(@inject("IOsuClientService") private osuClientService: IOsuClientService) {}

	public findBeatmap(beatmapId: number): Promise<OsuBeatmapExtendedEntity | null> {
		return this.osuClientService.findBeatmap(beatmapId);
	}
}
