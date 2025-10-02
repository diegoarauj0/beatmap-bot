declare namespace NodeJS {
	interface ProcessEnv {
		DISCORD_DISABLE_GLOBAL_COMMANDS: "true" | "false";
		NODE_ENV: "development" | "production";
		DISCORD_SERVER_ID: string;
		DISCORD_TOKEN: string;
		OSU_CLIENT_ID: string;
		OSU_CLIENT_SECRET: string;
		REDIS_URL: string;
		BEATMAP_CACHE_TTL: string;
		USER_CACHE_TTL: string;
	}
}
