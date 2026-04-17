"use client";

import { useExtracted } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import host from "@/lib";
import { useUser } from "@/store/user";
import { Buttons, Content, Form, FormContent, FormInfo, FormLabel } from "./page.css";

const page = () => {
	const t = useExtracted("auth");

	const { setAccessToken } = useUser();
	const router = useRouter();
	const searchParams = useSearchParams();

	const formRef = useRef<HTMLFormElement>(null);
	const [phone, setPhone] = useState<string>("");
	const sendCode = async () => {
		await host.post("/users/auth/code", { phone_number: phone });
	};
	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const json = Object.fromEntries(formData.entries());
		const inviter = searchParams.get("inviter");
		if (inviter) {
			json.inviter = inviter;
		}
		const { data } = await host.post(`/users/auth/login`, json);
		if ("access_token" in data) {
			setAccessToken(data.access_token);
			router.replace(searchParams.get("state") || "/");
		}
	};

	useEffect(() => {
		const handler = (e: MessageEvent) => {
			if ("access_token" in e.data) {
				setAccessToken(e.data.access_token);
				router.push(searchParams.get("state") || "/");
			}
		};

		window.addEventListener("message", handler);

		return () => window.removeEventListener("message", handler);
	}, [searchParams, router, setAccessToken]);

	return (
		<Content>
			<Form onSubmit={onSubmit} ref={formRef}>
				<FormInfo>
					<h3>{t("Enter login details")}</h3>
					<div>{t("You will be sent an SMS message with a confirmation code.")}</div>
				</FormInfo>
				<FormContent>
					<FormLabel>
						{t("Phone number")}
						<input
							type="text"
							placeholder="+380xxxxxXXXX"
							name="phone_number"
							required
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
						<button type="button" onClick={sendCode}>
							send
						</button>
					</FormLabel>
					<FormLabel>
						{t("Code")}
						<input type="text" name="code" required />
					</FormLabel>
				</FormContent>
				<Buttons>
					<div>
						{t("Continue with")}
						<button
							type="button"
							onClick={() =>
								window.open(
									`/auth/google?${searchParams.toString()}`,
									"Auth Google",
									"width=500,height=600,menubar=no,toolbar=no,status=no",
								)
							}
						>
							<u>
								<b>{t("Google")}</b>
							</u>
						</button>
					</div>
					<button type="submit">{t("Log in")}</button>
				</Buttons>
			</Form>
		</Content>
	);
};

export default page;
