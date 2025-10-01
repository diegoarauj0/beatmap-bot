import { UserExtendedOsuEntity } from "@domain/entities/osuUser.entity";

export enum OsuClientRuleset {
	Fruits = "fruits",
	Taiko = "taiko",
	Mania = "mania",
	Osu = "osu",
}

export interface IOsuClientService {
	findUser(query: string | number, ruleset: OsuClientRuleset): Promise<null | UserExtendedOsuEntity>;
}
