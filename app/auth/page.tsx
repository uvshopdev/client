"use client";

import { useExtracted } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner"; 

import host from "@/lib";
import { useUser } from "@/store/user";
import { 
    ActionInsideButton,
    Buttons, 
    Content, 
    Divider, 
    Form, 
    FormContent, 
    FormInfo, 
    FormLabel, 
    GoogleButton, 
    InputWithButtonWrapper 
} from "./page.css";

const AuthPage = () => {
    const t = useExtracted("auth");

    const { setAccessToken } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();

    const formRef = useRef<HTMLFormElement>(null);
    const [email, setEmail] = useState("");
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleSendCode = async () => {
        if (!email.trim()) {
            toast.error(t("Please enter a valid email address"));
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.trim())) {
            toast.error(t("Please enter a valid email address"));
            return;
        }

        try {
            await host.post("/users/auth/code", { email: email.trim() });
            toast.success(t("Code sent successfully"));
            setCountdown(60);
        } catch (error) {
            toast.error(t("Failed to send code"));
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const submittedEmail = formData.get("email")?.toString().trim();
        const code = formData.get("code")?.toString().trim();
        
        if (!submittedEmail || !code) {
            toast.error(t("Please fill in all required fields"));
            return;
        }

        const json = Object.fromEntries(formData.entries());
        const inviter = searchParams.get("inviter");
        if (inviter) {
            json.inviter = inviter;
        }
        
        try {
            const { data } = await host.post(`/users/auth/login`, json);
            if (data && "access_token" in data) {
                setAccessToken(data.access_token);
                toast.success(t("Successfully logged in"));
                router.replace(searchParams.get("state") || "/");
            }
        } catch (error) {
            toast.error(t("Invalid code"));
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
    }, [searchParams, router, setAccessToken]);

    const handleGoogleLogin = () => {
        window.open(
            `/auth/google?${searchParams.toString()}`,
            "Auth Google",
            "width=500,height=600,menubar=no,toolbar=no,status=no"
        );
    };

    return (
        <Content>
            <Form onSubmit={onSubmit} ref={formRef} noValidate>
                <FormInfo>
                    <h3>{t("Enter login details")}</h3>
                    <div>{t("Log in using your email or Google account")}</div>
                </FormInfo>

                <GoogleButton type="button" onClick={handleGoogleLogin}>
                    <Image src="/google_logo.png" alt="Google" width={24} height={24} />
                    <span>{t("Continue with Google")}</span>
                </GoogleButton>

                <Divider>
                    <span>{t("or")}</span>
                </Divider>

                <FormContent>
                    <FormLabel>
                        {t("Email")}
                        {(() => {
                            const buttonText = countdown > 0 
                                ? `00:${countdown.toString().padStart(2, '0')}` 
                                : (t("Send"));
                            
                            const paddingRight = buttonText.length > 6 ? 110 : 70;

                            return (
                                <InputWithButtonWrapper $padRight={paddingRight}>
                                    <input
                                        type="email"
                                        placeholder="example@email.com"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <ActionInsideButton 
                                        type="button" 
                                        onClick={handleSendCode}
                                        disabled={countdown > 0 || !email}
                                    >
                                        {buttonText}
                                    </ActionInsideButton>
                                </InputWithButtonWrapper>
                            );
                        })()}
                    </FormLabel>
                    
                    <FormLabel>
                        {t("Code")}
                        <input 
                            type="text" 
                            name="code" 
                            autoComplete="one-time-code"
                            required 
                        />
                    </FormLabel>
                </FormContent>
                
                <Buttons>
                    <button type="submit">{t("Log in")}</button>
                </Buttons>
            </Form>
        </Content>
    );
};

export default AuthPage;