import { IOsuBeatmapExtended, OsuBeatmapExtendedEntity } from "@domain/entities/osu/osuBeatmap.entity";
import { IOsuUserExtendedProfile, OsuUserExtendedEntity } from "@domain/entities/osu/osuUser.entity";
import { IOsuClientService, OsuClientRuleset } from "../contracts/services/osuClient.service";
import axios, { AxiosResponse } from "axios";
import { IOsuCacheService } from "../contracts/services/osuCache.service";
import { inject, injectable } from "tsyringe";
import { IOsuTokenService, IToken } from "../contracts/services/osuToken.service";

@injectable()
export default class OsuClientService implements IOsuClientService {
	public readonly isDev: boolean = process.env.NODE_ENV === "development";
	private readonly clientSecret: string = process.env.OSU_CLIENT_SECRET;
	private readonly clientId: number = Number(process.env.OSU_CLIENT_ID);

	private axiosInstance = axios.create({
		baseURL: "https://osu.ppy.sh/api/v2/",
		headers: {
			Accept: "application/json",
		},
	});

	constructor(
		@inject("IOsuCacheService") private osuCacheService: IOsuCacheService,
		@inject("IOsuTokenService") private osuTokenService: IOsuTokenService
	) {
		if (this.isDev) {
			this.axiosInstance.interceptors.request.use((req) => {
				console.log("[OUT] method:", req.method, "url:", req.url, "data:", req.data);
				return req;
			});
		}
	}

	private async get<T>(url: string): Promise<AxiosResponse<T, unknown, unknown>> {
		const token = await this.findToken();

		const response = await this.axiosInstance.get<T>(url, {
			headers: {
				Authorization: `Bearer ${token.accessToken}`,
				"Content-Type": "application/json",
			},
		});

		return response;
	}

	private async post<T, D>(url: string, data: D): Promise<AxiosResponse<T, unknown, unknown>> {
		const token = await this.findToken();

		const response = await this.axiosInstance.post<T>(url, data, {
			headers: {
				Authorization: `Bearer ${token.accessToken}`,
				"Content-Type": "application/json",
			},
		});

		return response;
	}

	private async findToken(): Promise<IToken> {
		const token = await this.osuTokenService.findToken();

		if (token !== null) {
			return token;
		}

		const response = await this.axiosInstance.post<{
			token_type: string;
			expires_in: number;
			access_token: string;
		}>("https://osu.ppy.sh/oauth/token", {
			client_id: this.clientId,
			client_secret: this.clientSecret,
			grant_type: "client_credentials",
			scope: "public",
		});

		await this.osuTokenService.saveToken({ accessToken: response.data.access_token }, response.data.expires_in);

		return {
			accessToken: response.data.access_token,
		};
	}

	public async findBeatmap(beatmapId: number): Promise<OsuBeatmapExtendedEntity | null> {
		try {
			const beatmap = await this.osuCacheService.findCache<IOsuBeatmapExtended>(`beatmap:${beatmapId}`);

			if (beatmap !== null) {
				return new OsuBeatmapExtendedEntity(beatmap);
			}

			const response = await this.get<IOsuBeatmapExtended>(`/beatmaps/${beatmapId}`);

			await this.osuCacheService.createCache<IOsuBeatmapExtended>(
				`beatmap:${beatmapId}`,
				response.data,
				Number(process.env.BEATMAP_CACHE_TTL || "300")
			);

			return new OsuBeatmapExtendedEntity(response.data);
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	public async findUser(
		query: string | number,
		ruleset: OsuClientRuleset
	): Promise<OsuUserExtendedEntity | null> {
		try {
			const user = await this.osuCacheService.findCache<IOsuUserExtendedProfile>(`user:${query}`);

			if (user !== null) {
				return new OsuUserExtendedEntity(user);
			}

			const response = await this.get<IOsuUserExtendedProfile>(`/users/${query}/${ruleset}`);

			await this.osuCacheService.createCache<IOsuUserExtendedProfile>(
				`user:${response.data.username}`,
				response.data,
				Number(process.env.USER_CACHE_TTL || "300")
			);

			await this.osuCacheService.createCache<IOsuUserExtendedProfile>(
				`user:${response.data.id}`,
				response.data,
				Number(process.env.USER_CACHE_TTL || "300")
			);

			return new OsuUserExtendedEntity(response.data);
		} catch (err) {
			console.error(err);
			return null;
		}
	}
}
