import { NextIntlClientProvider } from "next-intl";

const ServerProviders = ({ children }: { children: React.ReactNode }) => {
	return <NextIntlClientProvider>{children}</NextIntlClientProvider>;
};

export default ServerProviders;
