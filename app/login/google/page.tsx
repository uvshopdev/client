import { redirect } from "next/navigation";

const page = () => {
	const url = new URL("http://api.webshining.space/api/v1/users/auth/google");
	url.searchParams.append("state", "http://localhost:3000");
	redirect(url.toString());
};

export default page;
