import { redirect } from "next/navigation";

const page = () => {
	redirect("http://localhost:4000/api/v1/users/auth/google");
};

export default page;
