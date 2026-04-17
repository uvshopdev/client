import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const searchParams = new URLSearchParams(request.nextUrl.searchParams);
	searchParams.set("state", "popup");

	return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/auth/google?${searchParams.toString()}`);
}
