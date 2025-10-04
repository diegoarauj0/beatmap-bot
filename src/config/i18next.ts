import i18next from "i18next";
import en from "../../locales/en.json"
import pt from "../../locales/pt.json"

export default async function i18n() {
	await i18next.init({
		fallbackLng: "en",
		preload: ["en", "pt"],
		ns: ["translation"],
		defaultNS: "translation",
		resources: {
			en: en,
			pt: pt
		}
	});

	return i18next
}
