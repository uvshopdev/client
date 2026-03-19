import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.redirect(`${process.env.BACKEND_URL}/users/auth/google`);
}
