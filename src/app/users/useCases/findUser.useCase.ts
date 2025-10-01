import { IOsuClientService, OsuClientRuleset } from "@app/shared/contracts/services/osuClient.service";
import { IFindUserUseCase } from "../contracts/useCases/findUser.useCase";
import { UserExtendedOsuEntity } from "@domain/entities/osuUser.entity";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindUserUseCase implements IFindUserUseCase {
	constructor(@inject("IOsuClientService") private osuClientService: IOsuClientService) {}

	public findUser(query: string | number, ruleset: OsuClientRuleset): Promise<UserExtendedOsuEntity | null> {
		return this.osuClientService.findUser(query, ruleset);
	}
}
