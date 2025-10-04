import { IOsuBeatmapExtended, IOsuClientService } from "@app/shared/contracts/services/osuClient.service";
import { IFindBeatmapUseCase } from "../contracts/useCases/findBeatmap.useCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindBeatmapUseCase implements IFindBeatmapUseCase {
	constructor(@inject("IOsuClientService") private osuClientService: IOsuClientService) {}

	public findBeatmap(beatmapId: number): Promise<IOsuBeatmapExtended | null> {
		return this.osuClientService.findBeatmap(beatmapId);
	}
}
