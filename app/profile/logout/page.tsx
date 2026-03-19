"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
	const router = useRouter();

	useEffect(() => {
		localStorage.clear();
		fetch("/api/logout", { credentials: "include" }).then(() => {
			router.push("/");
		});
	}, [router]);
	return null;
};

export default page;
