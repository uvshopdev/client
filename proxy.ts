import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
	// const pathname = request.nextUrl.pathname;
	// if (pathname === "/auth" && request.cookies.get("session_id"))
	// 	return NextResponse.redirect(new URL("/", request.url));
	// if (pathname !== "/auth" && !request.cookies.get("session_id")) {
	// 	const url = new URL(`/auth?state=${encodeURIComponent(request.nextUrl.pathname)}`, request.url);
	// 	return NextResponse.redirect(url);
	// }
	return NextResponse.next();
}

export const config = {
	matcher: ["/profile/:path*", "/auth"],
};
