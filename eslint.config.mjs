import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import prettier from "eslint-config-prettier";

export default defineConfig([
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		ignores: ["node_modules/**", "dist/**"],
		extends: [js.configs.recommended],
		languageOptions: { globals: globals.node },
	},
	{
		files: ["**/*.{ts,mts,cts}"],
		extends: [tseslint.configs.recommended],
		rules: prettier.rules,
	},
]);
