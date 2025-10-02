export interface IOsuCacheService {
	createCache: <Value>(key: string, value: Value, expiresIn: number) => Promise<void>;
	findCache: <Value>(key: string) => Promise<Value | null>;
}
