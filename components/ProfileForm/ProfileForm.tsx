"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Camera, Eye, EyeOff } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { 
    AvatarOverlay, 
    AvatarSection, 
    Form, 
    FormLabel, 
    FormSection, 
    ImageContainer, 
    PhotoFrameOverlay,
    PasswordInputWrapper,
    PasswordToggle
} from "./ProfileForm.css";
import { getProfile, updateProfile } from "@/lib/user";

const ProfileForm = () => {
    const t = useExtracted("profile");

    const query = useQueryClient();
    const { data } = useQuery({
        queryKey: ["profile"],
        queryFn: async () => await getProfile(),
    });
    
    const [showPassword, setShowPassword] = useState(false);

    const mutation = useMutation({
        mutationFn: async (body: FormData) => await updateProfile(body),
        onSuccess: () => {
            query.invalidateQueries({ queryKey: ["profile"] });
            toast.success(t("Profile updated successfully"));
            const passwordInput = document.querySelector('input[name="password"]') as HTMLInputElement;
            if (passwordInput) passwordInput.value = "";
        },
        onError: () => {
            toast.error(t("Failed to update profile"));
        }
    });

    const avatarRef = useRef<HTMLImageElement>(null);
    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && avatarRef.current) avatarRef.current.src = URL.createObjectURL(file);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const finalData = new FormData(); 
        let hasChanges = false;
        
        const fullName = formData.get("full_name")?.toString().trim() || "";
        const email = formData.get("email")?.toString().trim() || "";
        const phone = formData.get("phone_number")?.toString().trim() || "";
        const password = formData.get("password")?.toString().trim() || "";
        const picture = formData.get("picture") as File;

        if (picture && picture.size > 0) {
            finalData.append("picture", picture);
            hasChanges = true;
        }

        const originalName = data?.full_name || "";
        if (fullName !== originalName) {
            if (!fullName) {
                toast.error(t("Name cannot be empty"));
                return;
            }
            finalData.append("full_name", fullName);
            hasChanges = true;
        }

        const originalEmail = data?.email || "";
        if (email !== originalEmail) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                toast.error(t("Please enter a valid email address"));
                return;
            }
            finalData.append("email", email);
            hasChanges = true;
        }

        const originalPhone = data?.phone_number || "";
        if (phone !== originalPhone) {
            let cleanedPhone = phone.replace(/\D/g, '');
            
            if (cleanedPhone.length > 0) {
                if (cleanedPhone.length < 10) {
                    toast.error(t("Please enter a valid phone number"));
                    return;
                }
                if (cleanedPhone.startsWith('0')) cleanedPhone = '38' + cleanedPhone;
                if (!cleanedPhone.startsWith('+')) cleanedPhone = '+' + cleanedPhone;
            } else {
                cleanedPhone = ""; 
            }

            finalData.append("phone_number", cleanedPhone);
            hasChanges = true;
        }

        if (password) {
            if (password.length < 6) {
                toast.error(t("Password must be at least 6 characters"));
                return;
            }
            finalData.append("password", password);
            hasChanges = true;
        }

        if (!hasChanges) {
            toast.info(t("No changes to save"));
            return;
        }

        mutation.mutate(finalData);
    };

    return (
        <Form onSubmit={onSubmit}>
            <AvatarSection>
                <PhotoFrameOverlay />

                <ImageContainer>
                    <Image
                        src={data?.picture ? `${process.env.NEXT_PUBLIC_FILES_URL}/${data.picture}` : "/logo.webp"}
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
                    <input type="text" name="full_name" defaultValue={data?.full_name || ""} />
                </FormLabel>

                <FormLabel>
                    {t("Email address")}
                    <input type="email" name="email" defaultValue={data?.email || ""} />
                </FormLabel>

                <FormLabel>
                    {t("Phone number")}
                    <input type="tel" name="phone_number" defaultValue={data?.phone_number || ""} />
                </FormLabel>

                <FormLabel>
                    {t("Password")}
                    <PasswordInputWrapper>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password"
							placeholder="********"
                            autoComplete="new-password" 
                        />
                        <PasswordToggle 
                            type="button" 
                            onClick={() => setShowPassword((prev) => !prev)}
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </PasswordToggle>
                    </PasswordInputWrapper>
                </FormLabel>

                <button type="submit" disabled={mutation.isPending}>
                    {mutation.isPending ? t("Saving...") : t("Save")}
                </button>
            </FormSection>
        </Form>
    );
};

export default ProfileForm;