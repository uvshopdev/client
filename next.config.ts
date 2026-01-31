import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	compiler: {
		styledComponents: true,
	},
};

const withNextIntl = createNextIntlPlugin({
	requestConfig: "./i18n/request.ts",
	experimental: {
		srcPath: "./",
		extract: { sourceLocale: "en-US" },
		messages: { format: "po", locales: ["en-US", "uk-UA"], path: "./messages", precompile: true },
	},
});
export default withNextIntl(nextConfig);
