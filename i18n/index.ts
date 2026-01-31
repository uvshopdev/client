export const locales = ["uk-UA", "en-US"] as const;

export type Locale = (typeof locales)[number];

export const localesDisplay: Record<Locale, string[]> = {
	"uk-UA": ["Укр", "Українська"],
	"en-US": ["Eng", "English"],
};
