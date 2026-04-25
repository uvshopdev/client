"use client";

import { Eye, EyeOff } from "lucide-react";
import { useExtracted } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import host from "@/lib";
import { useUser } from "@/store/user";
import {
    Buttons,
    Content,
    Divider,
    Form,
    FormContent,
    FormInfo,
    FormLabel,
    GoogleButton,
    PasswordInputWrapper,
    PasswordToggle,
    ToggleModeText,
} from "./page.css";

const AuthPage = () => {
    const t = useExtracted("auth");

    const { setAccessToken } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();

    const formRef = useRef<HTMLFormElement>(null);
    
    const [showPassword, setShowPassword] = useState(false); 
    const [isLogin, setIsLogin] = useState(true); 

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const fullName = formData.get("full_name")?.toString().trim();
        const submittedEmail = formData.get("email")?.toString().trim();
        const password = formData.get("password")?.toString().trim();

        if (!submittedEmail || !password || (!isLogin && !fullName)) {
            toast.error(t("Please fill in all required fields"));
            return;
        }

        if (password.length < 6) {
            toast.error(t("Password must be at least 6 characters"));
            return;
        }

        const json = Object.fromEntries(formData.entries());
        const inviter = searchParams.get("inviter");
        if (inviter) {
            json.inviter = inviter;
        }

        const endpoint = isLogin ? `/users/auth/login` : `/users/auth/register`; //змінити шлях на актуальний за потреби

        try {
            const { data } = await host.post(endpoint, json);
            
            if (data && "access_token" in data) {
                setAccessToken(data.access_token);
                toast.success(isLogin ? t("Successfully logged in") : t("Successfully registered"));
                router.replace(searchParams.get("state") || "/");
            } else if (!isLogin) {
                toast.success(t("Registration successful. Please log in."));
                setIsLogin(true);
                formRef.current?.reset();
            }
        } catch (error) {
            toast.error(isLogin ? t("Invalid email or password") : t("Registration failed. Email might be in use."));
        }
    };

    useEffect(() => {
        const handler = (e: MessageEvent) => {
            if ("access_token" in e.data) {
                setAccessToken(e.data.access_token);
                toast.success(t("Successfully logged in"));
                router.push(searchParams.get("state") || "/");
            }
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [router, searchParams, setAccessToken, t]);

    const handleGoogleLogin = () => {
        window.open(`/auth/google?${searchParams.toString()}`, "Auth Google", "width=500,height=600,menubar=no,toolbar=no,status=no");
    };

    return (
        <Content>
            <Form onSubmit={onSubmit} ref={formRef} noValidate>
                <FormInfo>
                    <h3>{isLogin ? t("Enter login details") : t("Create an account")}</h3>
                    <div>{isLogin ? t("Log in using your email or Google account") : t("Register using your email or Google account")}</div>
                </FormInfo>

                <GoogleButton type="button" onClick={handleGoogleLogin}>
                    <Image src="/google_logo.png" alt="Google" width={24} height={24} />
                    <span>{t("Continue with Google")}</span>
                </GoogleButton>

                <Divider>
                    <span>{t("or")}</span>
                </Divider>

                <FormContent>
                    {!isLogin &&
                    <FormLabel>
                        {t("Full Name")}
                        <input
                            type="text"
                            name="full_name"
                            required
                        />
                    </FormLabel>
                    }
                    <FormLabel>
                        {t("Email")}
                        <input
                            type="email"
                            placeholder="example@email.com"
                            name="email"
                            autoComplete="email"
                            required
                        />
                    </FormLabel>

                    <FormLabel>
                        {t("Password")}
                        <PasswordInputWrapper>
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                autoComplete={isLogin ? "current-password" : "new-password"}
                                required 
                            />
                            <PasswordToggle 
                                type="button" 
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </PasswordToggle>
                        </PasswordInputWrapper>
                    </FormLabel>
                </FormContent>

                <Buttons>
                    <button type="submit">{isLogin ? t("Log in") : t("Register")}</button>
                </Buttons>

                <ToggleModeText type="button" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin 
                        ? t("Don't have an account? Register") 
                        : t("Already have an account? Log in")}
                </ToggleModeText>
            </Form>
        </Content>
    );
};

export default AuthPage;