import { IFindBeatmapUseCase } from "@app/beatmap/contracts/useCases/findBeatmap.useCase";
import { IFindUserUseCase } from "@app/users/contracts/useCases/findUser.useCase";
import { FindBeatmapUseCase } from "@app/beatmap/useCases/findBeatmap.useCase";
import { FindUserUseCase } from "@app/users/useCases/findUser.useCase";
import { container } from "tsyringe";

container.register<IFindBeatmapUseCase>("IFindBeatmapUseCase", { useClass: FindBeatmapUseCase });
container.register<IFindUserUseCase>("IFindUserUseCase", { useClass: FindUserUseCase });
