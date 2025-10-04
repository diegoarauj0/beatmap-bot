import { IOsuUserExtendedProfile, OsuClientRuleset } from "@app/shared/contracts/services/osuClient.service";

export interface IFindUserUseCase {
	findUser(query: string | number, ruleset: OsuClientRuleset): Promise<IOsuUserExtendedProfile | null>;
}
