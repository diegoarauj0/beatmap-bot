import { OsuClientRuleset } from "@app/shared/contracts/services/osuClient.service";
import { UserExtendedOsuEntity } from "@domain/entities/osu/osuUser.entity";

export interface IFindUserUseCase {
	findUser(query: string | number, ruleset: OsuClientRuleset): Promise<UserExtendedOsuEntity | null>;
}
