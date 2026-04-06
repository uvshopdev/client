"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useExtracted } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

import { getProfile, updateProfile } from "@/lib/user";
import { AvatarSection, Form, FormLabel, FormSection } from "./ProfileForm.css";

const ProfileForm = () => {
	const t = useExtracted("profile");

	const query = useQueryClient();
	const { data } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => await getProfile(),
		staleTime: 60000 * 3,
	});
	const mutation = useMutation({
		mutationFn: async (body: FormData) => await updateProfile(body),
		onSuccess: () => query.invalidateQueries({ queryKey: ["profile"] }),
	});

	const avatarRef = useRef<HTMLImageElement>(null);
	const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && avatarRef.current) avatarRef.current.src = URL.createObjectURL(file);
	};

	const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		for (const [key, value] of formData) {
			console.log(`${key}: ${value}`);
		}
		mutation.mutate(formData);
	};
	return (
		<Form onSubmit={onSubmit}>
			<AvatarSection>
				<Image
					src={data?.picture ? `${process.env.NEXT_PUBLIC_FILES_URL}/${data.picture}` : "/logo.png"}
					fill
					alt={t("Avatar")}
					sizes="280x280"
					loading="eager"
					unoptimized
					ref={avatarRef}
				/>
				<input type="file" name="picture" accept="image/*" onChange={handleAvatarChange} />
			</AvatarSection>
			<FormSection>
				<FormLabel>
					{t("Full name")}
					<input type="text" name="full_name" defaultValue={data?.full_name || undefined} />
				</FormLabel>

				<FormLabel>
					{t("Email address")}
					<input type="email" name="email" defaultValue={data?.email || undefined} />
				</FormLabel>

				<FormLabel>
					{t("Phone number")}
					<input type="tel" name="phone_number" defaultValue={data?.phone_number || undefined} />
				</FormLabel>

				<button type="submit">{t("Save")}</button>
			</FormSection>
		</Form>
	);
};

export default ProfileForm;
