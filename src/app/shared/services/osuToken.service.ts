import { IOsuTokenService, IToken } from "../contracts/services/osuToken.service";
import { redis } from "@persistence/database/connectRedis.database";

export class OsuTokenService implements IOsuTokenService {
	public async findToken(): Promise<IToken | null> {
		const value = await redis.get(`osu:token`);

		if (typeof value !== "string" || value.length === 0) {
			return null;
		}

		return JSON.parse(value) as IToken;
	}

	public async saveToken(token: IToken, expiresIn: number): Promise<void> {
		await redis.set("osu:token", JSON.stringify(token), "EX", expiresIn);
	}
}
