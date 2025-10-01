import path from "path";
import fs from "fs";

const tokenFilePath = path.resolve(__dirname, "..", "..", "..", "..", "osu_token.json");
let auth:
	| {
			tokenType: string;
			expiresIn: number;
			accessToken: string;
	  }
	| undefined = undefined;

export async function setAuth({
	accessToken,
	expiresIn,
	tokenType,
}: {
	tokenType: string;
	expiresIn: number;
	accessToken: string;
}) {
	auth = {
		accessToken,
		expiresIn,
		tokenType,
	};

	await fs.promises.writeFile(tokenFilePath, JSON.stringify(auth), "utf8");
}

export async function getAuth() {
	if (auth !== undefined) {
		return auth;
	}

	if (fs.existsSync(tokenFilePath)) {
		const file = JSON.parse(await fs.promises.readFile(tokenFilePath, "utf8"));

		auth = file;

		return file;
	}
}
