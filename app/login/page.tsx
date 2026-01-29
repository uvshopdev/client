"use client";

import { useState } from "react";

import { content } from "./styles.css";

const page = () => {
	const [loginState, setLoginState] = useState<
		"loginEmail" | "loginPhone" | "registerEmail" | "registerPhone" | "phone"
	>("loginEmail");

	return (
		<div className={content}>
			<div></div>
		</div>
	);
};

export default page;
