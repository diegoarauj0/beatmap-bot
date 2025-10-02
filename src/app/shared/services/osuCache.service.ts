import { IOsuCacheService } from "../contracts/services/osuCache.service";
import { redis } from "@persistence/database/connectRedis.database";

export class OsuCacheService implements IOsuCacheService {
	public async createCache<Value>(key: string, value: Value, expiresIn: number): Promise<void> {
		await redis.set(`osu:cache:${key}`, JSON.stringify(value), "EX", expiresIn);
	}

	public async findCache<Value>(key: string): Promise<Value | null> {
		const value = await redis.get(`osu:cache:${key}`);

		if (typeof value !== "string" || value.length === 0) {
			return null;
		}

		return JSON.parse(value) as Value;
	}
}
