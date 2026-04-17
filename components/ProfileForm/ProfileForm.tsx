"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";
import { useRef } from "react";

// Обязательно импортируем новые стили ImageContainer и PhotoFrameOverlay
import { getProfile, updateProfile } from "@/lib/user";
import { AvatarOverlay, AvatarSection, Form, FormLabel, FormSection, ImageContainer, PhotoFrameOverlay } from "./ProfileForm.css";

const ProfileForm = () => {
	const t = useExtracted("profile");

	const query = useQueryClient();
	const { data } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => await getProfile(),
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
				{/* 1. Декоративная рамка на заднем плане (всю ширину 280x280) */}
				<PhotoFrameOverlay />

				{/* 2. Контейнер самой фотки (меньше по размеру и идеально круглый) */}
				<ImageContainer>
					<Image
						src={data?.picture ? `${process.env.NEXT_PUBLIC_FILES_URL}/${data.picture}` : "/logo.png"}
						fill
						style={{ objectFit: "cover" }}
						alt={t("Avatar")}
						sizes="200x200"
						loading="eager"
						unoptimized
						ref={avatarRef}
					/>
					<AvatarOverlay>
						<Camera size={32} style={{ marginBottom: "8px" }} />
						<span>{t("Change")}</span>
					</AvatarOverlay>
					<input type="file" name="picture" accept="image/*" onChange={handleAvatarChange} />
				</ImageContainer>
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
