import { IFindUserUseCase } from "@app/users/contracts/useCases/findUser.useCase"
import { FindUserUseCase } from "@app/users/useCases/findUser.useCase"
import { container } from "tsyringe"

container.register<IFindUserUseCase>("IFindUserUseCase", { useClass: FindUserUseCase })