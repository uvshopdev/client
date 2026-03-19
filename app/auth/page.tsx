"use client";

import * as jwt from "jsonwebtoken";
import { useExtracted } from "next-intl";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";

import host from "@/lib";
import { useUser } from "@/store/user";
import { Buttons, Content, Form, FormContent, FormInfo, FormLabel } from "./page.css";

const page = () => {
	const t = useExtracted("auth");

	const [state, setState] = useState<"login" | "register">("login");

	const { setAccessToken, setUser } = useUser();
	const router = useRouter();
	const searchParams = useSearchParams();

	const formRef = useRef<HTMLFormElement>(null);
	const onSubmit = async (e?: React.SubmitEvent<HTMLFormElement>) => {
		e?.preventDefault();

		const formData = new FormData(e?.currentTarget || formRef.current!);
		const json = Object.fromEntries(formData.entries());
		const { data } = await host.post(`/users/auth/${state.split("_")[0]}`, json);
		if ("access_token" in data) {
			const { userinfo } = jwt.decode(data.access_token) as any;
			setUser({
				email: userinfo.email,
				fullName: userinfo.full_name,
				phoneNumber: userinfo.phone_number,
				imageUrl: userinfo.image_url,
			});
			setAccessToken(data.access_token);
			router.push(searchParams.get("state") ?? "/");
		}
	};

	return (
		<Content>
			<Form onSubmit={onSubmit} ref={formRef}>
				<FormInfo>
					<h3>{state.startsWith("login") ? t("Enter login details") : t("Enter register details")}</h3>
					{["login_phone", "register_phone"].includes(state) && (
						<div>{t("You will be sent an SMS message with a confirmation code.")}</div>
					)}
				</FormInfo>
				{state === "login" ? (
					<FormContent>
						<FormLabel>
							{t("Phone number")}
							<input type="text" placeholder="+380xxxxxXXXX" name="phone_number" required />
							<button type="button" onClick={() => onSubmit()}>
								send
							</button>
						</FormLabel>
						<FormLabel>
							{t("Code")}
							<input type="text" name="code" required />
						</FormLabel>
					</FormContent>
				) : (
					<FormContent>
						<FormLabel>
							{t("Full name")}
							<input type="text" name="full_name" required />
						</FormLabel>
						<FormLabel>
							{t("Phone number")}
							<input type="text" placeholder="+380xxxxxXXXX" name="phone_number" required />
							<button type="button" onClick={() => onSubmit()}>
								{t("send")}
							</button>
						</FormLabel>
						<FormLabel>
							{t("Code")}
							<input type="text" name="code" required />
						</FormLabel>
					</FormContent>
				)}
				<Buttons>
					<div>
						{t("Forgot your password?")}
						<Link href="/login/reset-password">
							<u>
								<b>{t("Reset")}</b>
							</u>
						</Link>
					</div>
					<button type="submit">{t("Log in")}</button>
				</Buttons>
			</Form>
		</Content>
	);
};

export default page;
