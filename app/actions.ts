"use server";
import { cookies } from "next/headers";

import type { Locale } from "@/i18n";

export async function setLocaleCookie(locale: Locale) {
	const cookieStore = await cookies();

	cookieStore.set({
		name: "locale",
		value: locale,
		httpOnly: false,
		path: "/",
	});
}
