import { IOsuClientService, OsuClientRuleset } from "../contracts/services/osuClient.service";
import { IOsuUserExtenderProfile, UserExtendedOsuEntity } from "@domain/entities/osuUser.entity";
import { setAuth, getAuth } from "../stores/osuTokenStore";
import axios, { AxiosResponse } from "axios";

export default class OsuClientService implements IOsuClientService {
	public readonly isDev: boolean = process.env.NODE_ENV === "development";
	private readonly clientId: string = process.env.OSU_CLIENT_ID;
	private readonly clientSecret: string = process.env.OSU_CLIENT_SECRET;
	private accessToken: string | null;
	private tokenType: string | null;
	private expiresIn: number | null;

	private axiosInstance = axios.create({
		baseURL: "https://osu.ppy.sh/api/v2/",
		headers: {
			Accept: "application/json",
		},
	});

	constructor() {
		if (this.isDev) {
			this.axiosInstance.interceptors.request.use((req) => {
				console.log("[OUT] method:", req.method, "url:", req.url, "data:", req.data);
				return req;
			});
		}
	}

	private async get<T>(url: string): Promise<AxiosResponse<T, unknown, unknown>> {
		await this.authenticate();

		const response = await this.axiosInstance.get<T>(url, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
				"Content-Type": "application/json",
			},
		});

		return response;
	}

	private async post<T, D>(url: string, data: D): Promise<AxiosResponse<T, unknown, unknown>> {
		await this.authenticate();

		const response = await this.axiosInstance.post<T>(url, data, {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
				"Content-Type": "application/json",
			},
		});

		return response;
	}

	private async authenticate(): Promise<void> {
		const auth = await getAuth();

		if (auth) {
			this.accessToken = auth.accessToken;
			this.tokenType = auth.tokenType;
			this.expiresIn = auth.expiresIn;

			return;
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

		await setAuth({
			accessToken: response.data.access_token,
			expiresIn: response.data.expires_in,
			tokenType: response.data.token_type,
		});

		this.accessToken = response.data.access_token;
		this.tokenType = response.data.token_type;
		this.expiresIn = response.data.expires_in;
	}

	public async findUser(
		query: string | number,
		ruleset: OsuClientRuleset
	): Promise<UserExtendedOsuEntity | null> {
		try {
			const response = await this.get<IOsuUserExtenderProfile>(`/users/${query}/${ruleset}`);
			return new UserExtendedOsuEntity(response.data);
		} catch {
			return null;
		}
	}
}
