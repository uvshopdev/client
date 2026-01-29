export async function GET(request: Request) {
	const reqUrl = new URL(request.url);

	const res = await fetch(`http://localhost:4000/api/v1/categories?${reqUrl.searchParams.toString()}`, {
		next: { revalidate: 3 * 60 * 60 },
	});
	const data = await res.json();

	return Response.json(data);
}
