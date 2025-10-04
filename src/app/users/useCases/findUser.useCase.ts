import { IOsuClientService, IOsuUserExtendedProfile, OsuClientRuleset } from "@app/shared/contracts/services/osuClient.service";
import { IFindUserUseCase } from "../contracts/useCases/findUser.useCase";
import { inject, injectable } from "tsyringe";

@injectable()
export class FindUserUseCase implements IFindUserUseCase {
	constructor(@inject("IOsuClientService") private osuClientService: IOsuClientService) {}

	public findUser(query: string | number, ruleset: OsuClientRuleset): Promise<IOsuUserExtendedProfile | null> {
		return this.osuClientService.findUser(query, ruleset);
	}
}
