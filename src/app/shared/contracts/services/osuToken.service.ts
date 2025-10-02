export interface IToken {
	accessToken: string;
}

export interface IOsuTokenService {
	saveToken: (token: IToken, expiresIn: number) => Promise<void>;
	findToken: () => Promise<IToken | null>;
}
