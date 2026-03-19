import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const cookieStore = await cookies();
	cookieStore.delete("session_id");

	return NextResponse.json({ ok: true });
}
