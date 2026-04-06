import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	compiler: {
		styledComponents: true,
	},
	images: {
		imageSizes: [60, 80],
		dangerouslyAllowSVG: true,
		remotePatterns: [
			{
				protocol: "https",
				hostname: "shop.garage.webshining.space",
			},
			{
				protocol: "https",
				hostname: "placehold.co",
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin({
	requestConfig: "./i18n/request.ts",
	experimental: {
		srcPath: "./",
		extract: { sourceLocale: "en-US" },
		messages: { format: "po", locales: "infer", path: "./messages", precompile: true },
	},
});
export default withNextIntl(nextConfig);
